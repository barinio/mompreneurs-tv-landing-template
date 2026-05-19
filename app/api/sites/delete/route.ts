import { NextRequest, NextResponse } from 'next/server'
import { readSitesJson, writeSitesJson, deleteRepo } from '@/lib/github'
import { deleteVercelProject } from '@/lib/vercel'

// Deletion can touch Vercel + GitHub APIs sequentially; budget more than the
// default 10s.
export const maxDuration = 30

type DeleteMode = 'list-only' | 'full'

export async function POST(req: NextRequest) {
  const { name, url, mode } = (await req.json()) as {
    name?: string
    url?: string
    mode?: DeleteMode
  }

  if (!name || !/^[a-z0-9-]+$/.test(name)) {
    return NextResponse.json({ error: 'Invalid site name' }, { status: 400 })
  }
  if (mode !== 'list-only' && mode !== 'full') {
    return NextResponse.json({ error: 'Invalid mode' }, { status: 400 })
  }

  const owner = process.env.GITHUB_OWNER
  const currentRepo = process.env.GITHUB_REPO
  if (!owner || !currentRepo) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  try {
    if (mode === 'full') {
      // Order matters: delete Vercel project first (it depends on the GitHub
      // repo via git integration). 404s are tolerated inside both helpers so
      // partial cleanup from a previous failed attempt still completes.
      await deleteVercelProject(name)
      await deleteRepo(owner, name)
    }

    // Remove from the current repo's sites.json. Legacy data can have multiple
    // entries with the same name (e.g. "client1" created twice with different
    // Vercel suffix URLs), so filter on url when provided to drop the exact row.
    const { sites, sha } = await readSitesJson(owner, currentRepo)
    const filtered = sites.filter((s) => (url ? s.url !== url : s.name !== name))
    await writeSitesJson(owner, currentRepo, filtered, sha)

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete site'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
