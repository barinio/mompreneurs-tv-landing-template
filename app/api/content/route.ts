import { NextRequest, NextResponse } from 'next/server'
import { readContentJson, writeContentJson } from '@/lib/github'
import type { ContentJson } from '@/lib/types'

export async function GET() {
  const owner = process.env.GITHUB_OWNER!
  const repo = process.env.GITHUB_REPO!
  const { content, sha } = await readContentJson(owner, repo)
  return NextResponse.json({ content, sha })
}

export async function POST(req: NextRequest) {
  const owner = process.env.GITHUB_OWNER!
  const repo = process.env.GITHUB_REPO!
  const { section, data, sha } = await req.json() as {
    section: keyof ContentJson
    data: unknown
    sha: string
  }

  const { content: current } = await readContentJson(owner, repo)
  const updated: ContentJson = { ...current, [section]: data }
  await writeContentJson(owner, repo, updated, sha)

  return NextResponse.json({ ok: true })
}
