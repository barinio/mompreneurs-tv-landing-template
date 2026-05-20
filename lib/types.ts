export interface ContentJson {
  meta: {
    title: string
    description: string
    faviconUrl: string
    seoImageUrl: string
  }
  navBar: {
    announcementText?: string
    ctaText?: string
  }
  hero: {
    bgImageUrl: string
    bgImageMobileUrl?: string
  }
  seriesInfo: {
    boxes: Array<{ icon: string; label: string; value: string }>
  }
  whoFor: {
    bgImageUrl?: string
    headline?: string
    subheadline?: string
    items: Array<{ title: string; description: string }>
  }
  whoNotFor: {
    headline?: string
    items: Array<{ text: string }>
  }
  joinShow: {
    headline?: string
    subheadline?: string
    ctaText?: string
    ctaUrl: string
  }
  transformation: {
    headline?: string
    subheadline?: string
    benefits: Array<{ title: string; description: string }>
    posterUrl?: string
  }
  beingFeatured: {
    backgroundUrl?: string
    headline?: string
    intro?: string
    createsHeadline?: string
    bullets: Array<{ title: string; description: string }>
    closingTop?: string
    closingBold?: string
    closingBottom?: string
    closingExtra?: string
  }
  trustedMedia: {
    headline?: string
    screenshots: string[]
  }
  legendsLineup: {
    headline?: string
    featured: Array<{ url: string; alt: string }>
    grid: Array<{ url: string; alt: string }>
  }
  otherShows: {
    headline?: string
    posters: Array<{ url: string; alt: string }>
  }
  tvPackageIncluded: {
    bgImageUrl?: string
    headlineTop?: string
    logoUrl?: string
    headlineBottom?: string
    items: Array<{ title: string; description: string; imageUrl: string }>
    closingParagraphs: Array<{ text: string; boldSuffix?: string }>
  }
  bigScreen: {
    eyebrow?: string
    headline?: string
    logosUrl?: string
    body: string[]
    phoneUrl?: string
  }
  pressAwards: {
    bgImageUrl?: string
    seenOnHeadline?: string
    seenOnLogosUrl?: string
    reviewsHeadline?: string
    reviewsImageDesktopUrl?: string
    reviewsImageMobileUrl?: string
    awardsHeadlineTop?: string
    awardsHeadlineBottom?: string
    awardsImageUrl?: string
  }
  aboutShow: {
    bgImageUrl?: string
    eyebrow?: string
    logoUrl?: string
    body?: string
    imageUrl?: string
    standAmongHeadlineTop?: string
    standAmongHeadlineBottom?: string
    body2: Array<{ text: string; bold?: boolean }>
  }
  itsTime: {
    bgImageUrl?: string
    headlineTop?: string
    headlineBottom?: string
    bodyTop: string[]
    realityIntro?: string
    realityPoints: string[]
    headlineMidTop?: string
    headlineMidBottom?: string
    bodyMid: string[]
    imageUrl?: string
    imagineHeadline?: string
    bullets: string[]
  }
  howItWorks: {
    bgImageUrl?: string
    eyebrow?: string
    headline?: string
    items: Array<{ title: string; description: string }>
  }
  aboutNetwork: {
    bgImageUrl?: string
    eyebrow?: string
    headlineTop?: string
    headlineBottom?: string
    subheadline?: string
    subheadlineBold?: string
    body?: string
    logoUrl?: string
    logoLinkUrl?: string
  }
  faq: {
    bgImageUrl?: string
    headline?: string
    items: Array<{ question: string; answer: string }>
  }
  nineConsiderations: {
    headline?: string
    items: Array<{ title: string; body: string }>
  }
  footer: {
    logoUrl?: string
    address?: string
    privacyUrl?: string
    privacyLabel?: string
    termsUrl?: string
    termsLabel?: string
    disclaimerHeadline?: string
    disclaimerParagraphs: string[]
  }
  theme: {
    primaryColor: string
    accentColor: string
    fontFamily: string
  }
}

export type SectionKey = keyof ContentJson

export interface SiteEntry {
  name: string
  url: string
  adminUrl: string
  createdAt: string
  status: 'live' | 'deploying' | 'error'
}
