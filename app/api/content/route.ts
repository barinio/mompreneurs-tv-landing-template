import { NextRequest, NextResponse } from 'next/server'
import { readContentJson, writeContentJson } from '@/lib/github'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { ContentJson } from '@/lib/types'

function isGithubConfigured() {
  const owner = process.env.GITHUB_OWNER
  const token = process.env.GITHUB_TOKEN
  return owner && owner !== 'placeholder' && token && token !== 'placeholder'
}

function readLocalContent(): { content: ContentJson; sha: string } {
  const path = join(process.cwd(), 'content.json')
  const raw = readFileSync(path, 'utf-8')
  return { content: JSON.parse(raw) as ContentJson, sha: 'local' }
}

function writeLocalContent(content: ContentJson) {
  const path = join(process.cwd(), 'content.json')
  writeFileSync(path, JSON.stringify(content, null, 2), 'utf-8')
}

export async function GET() {
  if (!isGithubConfigured()) {
    return NextResponse.json(readLocalContent())
  }
  const owner = process.env.GITHUB_OWNER!
  const repo = process.env.GITHUB_REPO!
  const { content, sha } = await readContentJson(owner, repo)
  return NextResponse.json({ content, sha })
}

export async function POST(req: NextRequest) {
  const { content, sha } = await req.json() as {
    content: ContentJson
    sha: string
  }

  if (!isGithubConfigured()) {
    writeLocalContent(content)
    return NextResponse.json({ ok: true })
  }

  const owner = process.env.GITHUB_OWNER!
  const repo = process.env.GITHUB_REPO!
  await writeContentJson(owner, repo, content, sha)

  return NextResponse.json({ ok: true })
}
