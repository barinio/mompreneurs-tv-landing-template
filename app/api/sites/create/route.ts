import { NextRequest, NextResponse } from 'next/server'
import { createFromTemplate, readContentJson, writeContentJson, readSitesJson, writeSitesJson, waitForRepoReady, getRepoId, markAsTemplate } from '@/lib/github'
import { createVercelProject, setEnvVars, triggerDeploy } from '@/lib/vercel'
import { contentDefault } from '@/lib/content-default'
import type { SiteEntry } from '@/lib/types'

// Provisioning a clone does fork + multiple GitHub/Vercel API round-trips,
// often 30–60s total. Default 10s would time out.
export const maxDuration = 60

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
    // 1. Generate new repo from template (works for same-owner; fork doesn't)
    await createFromTemplate(owner, templateRepo, owner, name)

    // 2. Poll until new repo is ready (generation is async on GitHub's side)
    await waitForRepoReady(owner, name)

    // 3. Mark new repo as template too — enables multi-level cloning.
    //    is_template doesn't propagate automatically through createUsingTemplate.
    await markAsTemplate(owner, name)

    // 4. Read existing SHA and reset content.json to blank template
    const { sha: contentSha } = await readContentJson(owner, name)
    await writeContentJson(owner, name, contentDefault, contentSha)

    // 3. Create Vercel project linked to forked repo
    const project = await createVercelProject(name, owner, name)

    // 4. Set env vars on new project
    // NOTE: For multi-level cloning validation, propagate template powers to clone.
    // Each clone becomes a sub-template that can create its own clones.
    // Security: revisit before opening to untrusted users — every clone gets full Vercel token + PAT.
    // Note: Vercel reserves the VERCEL_* env var prefix for system vars, so we use DEPLOY_VERCEL_* instead.
    const cloneEnv: Record<string, string> = {
      ADMIN_PASSWORD: adminPassword,
      GITHUB_TOKEN: githubToken,
      GITHUB_OWNER: owner,
      GITHUB_REPO: name,
      IS_TEMPLATE: 'true',
      NEXT_PUBLIC_IS_TEMPLATE: 'true',
      DEPLOY_VERCEL_TOKEN: process.env.DEPLOY_VERCEL_TOKEN ?? '',
    }
    // Only propagate team ID if set — Vercel rejects empty string values
    if (process.env.DEPLOY_VERCEL_TEAM_ID) {
      cloneEnv.DEPLOY_VERCEL_TEAM_ID = process.env.DEPLOY_VERCEL_TEAM_ID
    }
    await setEnvVars(project.id, cloneEnv)

    // 5. Trigger first deployment (Vercel v13 requires numeric GitHub repo ID)
    const repoId = await getRepoId(owner, name)
    const siteUrl = await triggerDeploy(project.id, name, repoId)

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
