import type { ContentJson } from '@/lib/types'

// Compile-time check: a valid object must satisfy the interface
const valid: ContentJson = {
  meta: { title: 'T', description: 'D', faviconUrl: '/f.png', seoImageUrl: '/s.jpg' },
  hero: { logoUrl: '/logo.png', headline: 'H', ctaText: 'Apply', ctaUrl: 'https://x.com' },
  cast: { heading: 'Cast', images: [{ url: '/img.jpg', label: 'Soon' }] },
  seriesInfo: { series: 'S', status: 'Open', location: 'Miami', filmingDate: 'Autumn 2026' },
  whoFor: [{ title: 'T', description: 'D' }],
  whoNotFor: [{ text: 'T' }],
  transformation: { headline: 'H', benefits: ['B'], posterUrl: '/p.jpg' },
  problemSolution: { body: 'B' },
  aboutShow: { body: 'B', imageUrl: '/i.jpg' },
  tvPackages: { heading: 'H', features: [{ title: 'T', description: 'D', imageUrl: '/i.jpg' }] },
  streamingPlatforms: { heading: 'H', logosDesktopUrl: '/d.png', logosMobileUrl: '/m.png' },
  mediaCredibility: { screenshots: [{ url: '/s.jpg' }], stats: [{ text: 'T' }] },
  womenInPower: { heading: 'H', description: 'D', ctaText: 'Apply', ctaUrl: 'https://x.com', imageUrl: '/i.jpg' },
  howItWorks: [{ step: 1, title: 'T', description: 'D' }],
  threePackages: [{ title: 'T', description: 'D', features: ['F'] }],
  whyTvStats: [{ stat: '44M', description: 'D' }],
  aboutNetwork: { body: 'B', logoUrl: '/l.png' },
  team: [{ name: 'N', role: 'R', imageUrl: '/i.png' }],
  faq: [{ question: 'Q', answer: 'A' }],
  nineConsiderations: [{ title: 'T', body: 'B' }],
  footer: { address: 'A', privacyUrl: '/p', termsUrl: '/t', disclaimer: 'D' },
  theme: { primaryColor: '#CAA97A', accentColor: '#D6002A', fontFamily: 'Montserrat' },
}

describe('ContentJson type', () => {
  it('satisfies all required fields', () => {
    expect(valid.hero.ctaText).toBe('Apply')
    expect(valid.team[0].name).toBe('N')
    expect(valid.faq[0].question).toBe('Q')
  })
})
