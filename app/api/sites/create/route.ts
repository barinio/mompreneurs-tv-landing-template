import { NextRequest, NextResponse } from 'next/server'
import { forkRepo, readContentJson, writeContentJson, readSitesJson, writeSitesJson } from '@/lib/github'
import { createVercelProject, setEnvVars, triggerDeploy } from '@/lib/vercel'
import { contentDefault } from '@/lib/content-default'
import type { SiteEntry } from '@/lib/types'

export async function POST(req: NextRequest) {
  const { name, adminPassword } = await req.json() as { name: string; adminPassword: string }

  if (!name || !/^[a-z0-9-]+$/.test(name)) {
    return NextResponse.json({ error: 'Invalid site name. Use lowercase letters, numbers, hyphens.' }, { status: 400 })
  }

  const owner = process.env.GITHUB_OWNER
  const templateRepo = process.env.GITHUB_REPO
  const githubToken = process.env.GITHUB_TOKEN

  if (!owner || !templateRepo || !githubToken) {
    return NextResponse.json({ error: 'Server misconfiguration: missing GitHub env vars' }, { status: 500 })
  }

  try {
    // 1. Fork template repo
    await forkRepo(owner, templateRepo, name)

    // 2. Wait briefly for fork to be ready, then read existing SHA and reset content.json to blank template
    await new Promise((r) => setTimeout(r, 3000))
    const { sha: contentSha } = await readContentJson(owner, name)
    await writeContentJson(owner, name, contentDefault, contentSha)

    // 3. Create Vercel project linked to forked repo
    const project = await createVercelProject(name, owner, name)

    // 4. Set env vars on new project
    // NOTE: For multi-level cloning validation, propagate template powers to clone.
    // Each clone becomes a sub-template that can create its own clones.
    // Security: revisit before opening to untrusted users — every clone gets full Vercel token + PAT.
    // Note: Vercel reserves the VERCEL_* env var prefix for system vars, so we use DEPLOY_VERCEL_* instead.
    await setEnvVars(project.id, {
      ADMIN_PASSWORD: adminPassword,
      GITHUB_TOKEN: githubToken,
      GITHUB_OWNER: owner,
      GITHUB_REPO: name,
      IS_TEMPLATE: 'true',
      NEXT_PUBLIC_IS_TEMPLATE: 'true',
      DEPLOY_VERCEL_TOKEN: process.env.DEPLOY_VERCEL_TOKEN ?? '',
      DEPLOY_VERCEL_TEAM_ID: process.env.DEPLOY_VERCEL_TEAM_ID ?? '',
    })

    // 5. Trigger first deployment
    const siteUrl = await triggerDeploy(project.id, owner, name)

    // 6. Record new site in sites.json of template repo
    const { sites, sha } = await readSitesJson(owner, templateRepo)
    const entry: SiteEntry = {
      name,
      url: siteUrl,
      adminUrl: `${siteUrl}/admin`,
      createdAt: new Date().toISOString(),
      status: 'deploying',
    }
    await writeSitesJson(owner, templateRepo, [...sites, entry], sha)

    return NextResponse.json({ ok: true, url: siteUrl, adminUrl: entry.adminUrl })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
