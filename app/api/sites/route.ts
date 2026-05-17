import { NextResponse } from 'next/server'
import { readSitesJson } from '@/lib/github'

export async function GET() {
  const owner = process.env.GITHUB_OWNER!
  const repo = process.env.GITHUB_REPO!
  const { sites } = await readSitesJson(owner, repo)
  return NextResponse.json({ sites })
}
