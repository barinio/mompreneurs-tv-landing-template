import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'

const MAX_BYTES = 5 * 1024 * 1024

// Images go to Vercel Blob (a CDN), not the GitHub repo. Committing every
// upload to /public used to trigger a full Vercel rebuild per file, which
// piled up the deploy queue. Blob returns a ready-to-use public URL instantly
// and needs no rebuild — only "Save & Deploy" (content.json) deploys.
export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File exceeds 5 MB limit' }, { status: 413 })
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Image storage not configured. Connect a Vercel Blob store to this project.' },
      { status: 500 }
    )
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const filename = `${Date.now()}-${safeName}`

  try {
    // addRandomSuffix:false keeps the URL predictable; our timestamp prefix
    // already guarantees uniqueness.
    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type || undefined,
      addRandomSuffix: false,
    })
    return NextResponse.json({ url: blob.url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Upload failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
