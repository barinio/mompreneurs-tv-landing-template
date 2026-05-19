import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { ContentJson } from '@/lib/types'

const mockGetContent = vi.fn()
const mockCreateOrUpdateFileContents = vi.fn()
const mockFork = vi.fn()

vi.mock('@octokit/rest', () => ({
  Octokit: vi.fn().mockImplementation(() => ({
    repos: {
      getContent: mockGetContent,
      createOrUpdateFileContents: mockCreateOrUpdateFileContents,
      createFork: mockFork,
    },
  })),
}))

import { readContentJson, writeContentJson, forkRepo } from '@/lib/github'

const fakeContent: ContentJson = {
  meta: { title: 'T', description: 'D', faviconUrl: '/f', seoImageUrl: '/s' },
  hero: { logoUrl: '/l', headline: 'H', ctaText: 'Apply', ctaUrl: 'https://x.com' },
  cast: { heading: 'C', images: [] },
  seriesInfo: { series: 'S', status: 'Open', location: 'L', filmingDate: 'F' },
  whoFor: [], whoNotFor: [],
  transformation: { headline: 'H', benefits: [], posterUrl: '/p' },
  problemSolution: { body: 'B' },
  aboutShow: { eyebrow: 'ABOUT', logoUrl: '/l.png', body: 'B', imageUrl: '/i', standAmongHeadlineTop: 'T', standAmongHeadlineBottom: 'B', body2: [] },
  tvPackages: { heading: 'H', features: [] },
  streamingPlatforms: { heading: 'H', logosDesktopUrl: '/d', logosMobileUrl: '/m' },
  mediaCredibility: { screenshots: [], stats: [] },
  womenInPower: { heading: 'H', description: 'D', ctaText: 'A', ctaUrl: '#', imageUrl: '/i' },
  howItWorks: { eyebrow: 'E', headline: 'H', items: [] }, threePackages: [], whyTvStats: [],
  aboutNetwork: { eyebrow: 'W', headlineTop: 'I', headlineBottom: 'N', subheadline: 'S', subheadlineBold: 'B', body: 'B', logoUrl: '/l' },
  team: [], faq: [], nineConsiderations: { headline: 'H', items: [] },
  footer: { logoUrl: '/l', address: 'A', privacyUrl: '/p', privacyLabel: 'P', termsUrl: '/t', termsLabel: 'T', disclaimerHeadline: 'H', disclaimerParagraphs: ['D'] },
  theme: { primaryColor: '#CAA97A', accentColor: '#D6002A', fontFamily: 'Montserrat' },
}

describe('readContentJson', () => {
  beforeEach(() => vi.clearAllMocks())

  it('decodes base64 content from GitHub API response', async () => {
    const encoded = Buffer.from(JSON.stringify(fakeContent)).toString('base64')
    mockGetContent.mockResolvedValue({ data: { content: encoded, sha: 'abc123' } })

    const result = await readContentJson('owner', 'repo')
    expect(result.content.meta.title).toBe('T')
    expect(result.sha).toBe('abc123')
  })
})

describe('writeContentJson', () => {
  beforeEach(() => vi.clearAllMocks())

  it('calls createOrUpdateFileContents with base64 encoded content', async () => {
    mockCreateOrUpdateFileContents.mockResolvedValue({})
    await writeContentJson('owner', 'repo', fakeContent, 'sha123')
    expect(mockCreateOrUpdateFileContents).toHaveBeenCalledWith(
      expect.objectContaining({
        owner: 'owner',
        repo: 'repo',
        path: 'content.json',
        sha: 'sha123',
        message: expect.stringContaining('Update content'),
      })
    )
  })
})

describe('forkRepo', () => {
  beforeEach(() => vi.clearAllMocks())

  it('calls createFork with correct owner and repo', async () => {
    mockFork.mockResolvedValue({ data: { name: 'new-site', html_url: 'https://github.com/owner/new-site' } })
    const result = await forkRepo('owner', 'tv-landing-template', 'new-site')
    expect(mockFork).toHaveBeenCalledWith({ owner: 'owner', repo: 'tv-landing-template', name: 'new-site', default_branch_only: true })
    expect(result.name).toBe('new-site')
  })
})
