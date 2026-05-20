import { describe, it, expect, vi, beforeEach } from 'vitest'

// Exercise the GitHub-backed path (which is mocked below). Without these the
// route falls back to reading/writing the real content.json on disk, which
// both fails these assertions and clobbers the project's content.
process.env.GITHUB_OWNER = 'owner'
process.env.GITHUB_REPO = 'repo'
process.env.GITHUB_TOKEN = 'token'

vi.mock('@/lib/github', () => ({
  readContentJson: vi.fn().mockResolvedValue({
    content: { meta: { title: 'T' } },
    sha: 'abc',
  }),
  writeContentJson: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('next/headers', () => ({
  cookies: () => ({ get: () => ({ value: '1' }) }),
}))

import { GET, POST } from '@/app/api/content/route'
import { readContentJson, writeContentJson } from '@/lib/github'

describe('GET /api/content', () => {
  it('returns content and sha from GitHub', async () => {
    const res = await GET()
    const json = await res.json()
    expect(json.content.meta.title).toBe('T')
    expect(json.sha).toBe('abc')
  })
})

describe('POST /api/content', () => {
  beforeEach(() => vi.clearAllMocks())

  it('calls writeContentJson with the full content', async () => {
    const content = { meta: { title: 'T' }, hero: { ctaText: 'GO' } }
    const body = { content, sha: 'abc' }
    const req = new Request('http://localhost/api/content', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    await POST(req as any)
    expect(writeContentJson).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      content,
      'abc'
    )
  })
})
