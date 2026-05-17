import { NextRequest, NextResponse } from 'next/server'
import { uploadImage } from '@/lib/github'

const owner = process.env.GITHUB_OWNER!
const repo = process.env.GITHUB_REPO!
const MAX_BYTES = 5 * 1024 * 1024

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File exceeds 5 MB limit' }, { status: 413 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString('base64')
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`

  const url = await uploadImage(owner, repo, filename, base64)
  return NextResponse.json({ url })
}
