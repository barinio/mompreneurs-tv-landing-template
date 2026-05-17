export interface ContentJson {
  meta: {
    title: string
    description: string
    faviconUrl: string
    seoImageUrl: string
  }
  hero: {
    logoUrl: string
    headline: string
    subheadline?: string
    ctaText: string
    ctaUrl: string
  }
  cast: {
    heading: string
    images: Array<{ url: string; label: string }>
  }
  seriesInfo: {
    series: string
    status: string
    location: string
    filmingDate: string
  }
  whoFor: Array<{ title: string; description: string }>
  whoNotFor: Array<{ text: string }>
  transformation: {
    headline: string
    benefits: string[]
    posterUrl: string
  }
  problemSolution: { body: string }
  aboutShow: { body: string; imageUrl: string }
  tvPackages: {
    heading: string
    features: Array<{ title: string; description: string; imageUrl: string }>
  }
  streamingPlatforms: {
    heading: string
    logosDesktopUrl: string
    logosMobileUrl: string
  }
  mediaCredibility: {
    screenshots: Array<{ url: string }>
    stats: Array<{ text: string }>
  }
  womenInPower: {
    heading: string
    description: string
    ctaText: string
    ctaUrl: string
    imageUrl: string
  }
  howItWorks: Array<{ step: number; title: string; description: string }>
  threePackages: Array<{ title: string; description: string; features: string[] }>
  whyTvStats: Array<{ stat: string; description: string }>
  aboutNetwork: { body: string; logoUrl: string }
  team: Array<{ name: string; role: string; imageUrl: string }>
  faq: Array<{ question: string; answer: string }>
  nineConsiderations: Array<{ title: string; body: string }>
  footer: {
    address: string
    privacyUrl: string
    termsUrl: string
    disclaimer: string
  }
  theme: {
    primaryColor: string
    accentColor: string
    fontFamily: string
  }
}

export type SectionKey = keyof Omit<ContentJson, 'meta' | 'theme'>

export interface SiteEntry {
  name: string
  url: string
  adminUrl: string
  createdAt: string
  status: 'live' | 'deploying' | 'error'
}
