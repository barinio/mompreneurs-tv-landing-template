import { NextRequest, NextResponse } from 'next/server'
import { createFromTemplate, readContentJson, writeContentJson, readSitesJson, writeSitesJson, waitForRepoReady, getRepoId } from '@/lib/github'
import { createVercelProject, setEnvVars, triggerDeploy } from '@/lib/vercel'
import { contentDefault } from '@/lib/content-default'
import type { SiteEntry } from '@/lib/types'

// Provisioning a clone does multiple GitHub/Vercel API round-trips, often 30–60s total.
// Default 10s would time out.
export const maxDuration = 60

export async function POST(req: NextRequest) {
  const { name, adminPassword } = await req.json() as { name: string; adminPassword: string }

  if (!name || !/^[a-z0-9-]+$/.test(name)) {
    return NextResponse.json({ error: 'Invalid site name. Use lowercase letters, numbers, hyphens.' }, { status: 400 })
  }

  const owner = process.env.GITHUB_OWNER
  const currentRepo = process.env.GITHUB_REPO
  const githubToken = process.env.GITHUB_TOKEN

  // All new clones are generated from the master template — regardless of which
  // level (Ivan, his client, his client's client) initiates the creation.
  // This keeps every clone identical in code + structure, and makes a freshly
  // deployed master propagate to all future clones automatically.
  // Falls back to current repo if MASTER_TEMPLATE_* isn't set (e.g., on the
  // master itself before env vars were updated).
  const masterOwner = process.env.MASTER_TEMPLATE_OWNER || owner
  const masterRepo = process.env.MASTER_TEMPLATE_REPO || currentRepo

  if (!owner || !currentRepo || !githubToken || !masterOwner || !masterRepo) {
    return NextResponse.json({ error: 'Server misconfiguration: missing GitHub env vars' }, { status: 500 })
  }

  try {
    // 1. Generate new repo from MASTER template (not from current site)
    await createFromTemplate(masterOwner, masterRepo, owner, name)

    // 2. Poll until new repo is ready (generation is async on GitHub's side)
    await waitForRepoReady(owner, name)

    // 3. Reset content.json to blank template
    const { sha: contentSha } = await readContentJson(owner, name)
    await writeContentJson(owner, name, contentDefault, contentSha)

    // 4. Reset sites.json on the new clone to an empty list.
    //    createUsingTemplate copies the master's sites.json verbatim, so without
    //    this the new clone would show the master's children as its own.
    const { sha: sitesSha } = await readSitesJson(owner, name)
    await writeSitesJson(owner, name, [], sitesSha)

    // 5. Create Vercel project linked to new repo
    const project = await createVercelProject(name, owner, name)

    // 6. Set env vars on new project — every clone points at the same master.
    //    Security: revisit before opening to untrusted users — every clone gets
    //    full Vercel token + GitHub PAT.
    //    Note: Vercel reserves the VERCEL_* prefix, so we use DEPLOY_VERCEL_* instead.
    const cloneEnv: Record<string, string> = {
      ADMIN_PASSWORD: adminPassword,
      GITHUB_TOKEN: githubToken,
      GITHUB_OWNER: owner,
      GITHUB_REPO: name,
      MASTER_TEMPLATE_OWNER: masterOwner,
      MASTER_TEMPLATE_REPO: masterRepo,
      IS_TEMPLATE: 'true',
      NEXT_PUBLIC_IS_TEMPLATE: 'true',
      DEPLOY_VERCEL_TOKEN: process.env.DEPLOY_VERCEL_TOKEN ?? '',
    }
    if (process.env.DEPLOY_VERCEL_TEAM_ID) {
      cloneEnv.DEPLOY_VERCEL_TEAM_ID = process.env.DEPLOY_VERCEL_TEAM_ID
    }
    // Clones share the master's Blob store. Image URLs are absolute CDN links,
    // so a clone storing images in the master's store works fine.
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      cloneEnv.BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN
    }
    await setEnvVars(project.id, cloneEnv)

    // 7. Trigger first deployment (Vercel v13 requires numeric GitHub repo ID)
    const repoId = await getRepoId(owner, name)
    const siteUrl = await triggerDeploy(project.id, name, repoId)

    // 8. Record new site in sites.json of CURRENT repo (so each level tracks
    //    only the sites it created, not all sites globally)
    const { sites, sha } = await readSitesJson(owner, currentRepo)
    const entry: SiteEntry = {
      name,
      url: siteUrl,
      adminUrl: `${siteUrl}/admin`,
      createdAt: new Date().toISOString(),
      status: 'deploying',
    }
    await writeSitesJson(owner, currentRepo, [...sites, entry], sha)

    return NextResponse.json({ ok: true, url: siteUrl, adminUrl: entry.adminUrl })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
