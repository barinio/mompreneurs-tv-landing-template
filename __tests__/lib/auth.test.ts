import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Next.js cookies
const mockCookieStore = {
  get: vi.fn(),
  set: vi.fn(),
  delete: vi.fn(),
}
vi.mock('next/headers', () => ({
  cookies: () => Promise.resolve(mockCookieStore),
}))

import { verifySession, SESSION_COOKIE } from '@/lib/auth'

describe('verifySession', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns true when session cookie is present', async () => {
    mockCookieStore.get.mockReturnValue({ value: '1' })
    expect(await verifySession()).toBe(true)
    expect(mockCookieStore.get).toHaveBeenCalledWith(SESSION_COOKIE)
  })

  it('returns false when session cookie is absent', async () => {
    mockCookieStore.get.mockReturnValue(undefined)
    expect(await verifySession()).toBe(false)
  })
})
