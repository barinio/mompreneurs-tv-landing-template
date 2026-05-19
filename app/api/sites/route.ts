import { NextResponse } from 'next/server'
import { readSitesJson } from '@/lib/github'

export const dynamic = 'force-dynamic'

export async function GET() {
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  if (!owner || !repo) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }
  try {
    const { sites } = await readSitesJson(owner, repo)
    return NextResponse.json({ sites })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to read sites'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
