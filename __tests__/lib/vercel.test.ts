import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

import { createVercelProject, setEnvVars, triggerDeploy } from '@/lib/vercel'

describe('createVercelProject', () => {
  beforeEach(() => vi.clearAllMocks())

  it('POSTs to Vercel API with correct body', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'proj_123', name: 'my-site', link: { deployHooks: [] } }),
    })

    const result = await createVercelProject('my-site', 'owner', 'my-site-repo')
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/v9/projects'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(result.name).toBe('my-site')
  })

  it('throws when Vercel API returns non-ok', async () => {
    mockFetch.mockResolvedValue({ ok: false, json: async () => ({ error: { message: 'Bad' } }) })
    await expect(createVercelProject('x', 'o', 'r')).rejects.toThrow('Bad')
  })
})

describe('setEnvVars', () => {
  beforeEach(() => vi.clearAllMocks())

  it('calls Vercel env endpoint for each variable', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) })
    const vars = { ADMIN_PASSWORD: 'secret', GITHUB_TOKEN: 'tok' }
    await setEnvVars('proj_123', vars)
    expect(mockFetch).toHaveBeenCalledTimes(2)
  })
})

describe('triggerDeploy', () => {
  beforeEach(() => vi.clearAllMocks())

  it('POSTs to Vercel deployments API and returns URL', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ url: 'my-site.vercel.app' }),
    })
    const result = await triggerDeploy('proj_123', 'owner', 'my-site')
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/v13/deployments'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(result).toBe('https://my-site.vercel.app')
  })

  it('falls back to vercel.app URL when response has no url field', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    })
    const result = await triggerDeploy('proj_123', 'owner', 'my-site')
    expect(result).toBe('https://my-site.vercel.app')
  })

  it('throws when Vercel API returns non-ok', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: { message: 'Deploy failed' } }),
    })
    await expect(triggerDeploy('proj_123', 'owner', 'my-site')).rejects.toThrow('Deploy failed')
  })
})
