import { NextResponse } from 'next/server'
import { readSitesJson } from '@/lib/github'

export const dynamic = 'force-dynamic'

export async function GET() {
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  if (!owner || !repo) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }
  const { sites } = await readSitesJson(owner, repo)
  return NextResponse.json({ sites })
}
