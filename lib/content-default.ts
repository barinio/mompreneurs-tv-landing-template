import type { ContentJson } from './types'

export const contentDefault: ContentJson = {
  meta: {
    title: 'Your TV Show',
    description: 'Apply to be featured on our TV show.',
    faviconUrl: '/images/Mom_Favicon.png',
    seoImageUrl: '/images/m-seo-1-.jpg',
  },
  hero: {
    logoUrl: '/images/Mompreneurs-Logo.png',
    headline: 'Apply Now To Be Featured On Our TV Show',
    ctaText: 'APPLY NOW',
    ctaUrl: '#',
  },
  cast: {
    heading: 'STAR-STUDDED CAST',
    images: [
      { url: '/images/Announced-Soon-1.jpg', label: 'Announced Soon' },
      { url: '/images/Announced-Soon-2.jpg', label: 'Announced Soon' },
      { url: '/images/Announced-Soon-1.jpg', label: 'Announced Soon' },
      { url: '/images/Announced-Soon-2.jpg', label: 'Announced Soon' },
    ],
  },
  seriesInfo: {
    series: 'YOUR SHOW',
    status: 'Casting Open',
    location: 'Your City',
    filmingDate: '2026',
  },
  whoFor: [
    { title: 'Category 1', description: 'Describe your ideal applicant here.' },
    { title: 'Category 2', description: 'Describe your ideal applicant here.' },
    { title: 'Category 3', description: 'Describe your ideal applicant here.' },
  ],
  whoNotFor: [
    { text: 'Exclusion criterion 1.' },
    { text: 'Exclusion criterion 2.' },
  ],
  transformation: {
    headline: 'One TV Feature Could Change Your Business Forever...',
    benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'],
    posterUrl: '/images/Mompreneurs-Poster-Final-2_Reduced.jpg',
  },
  problemSolution: { body: 'Describe the problem your audience faces and how your show solves it.' },
  aboutShow: {
    body: 'Describe your show, its mission, and who it features.',
    imageUrl: '/images/Mompreneurs-Poster.jpg',
  },
  tvPackages: {
    heading: 'YOUR TV FEATURE PACKAGE INCLUDES',
    features: [
      { title: 'Feature 1', description: 'Description of this package feature.', imageUrl: '/images/Mockup-1.jpg' },
      { title: 'Feature 2', description: 'Description of this package feature.', imageUrl: '/images/Mockup-3.jpg' },
    ],
  },
  streamingPlatforms: {
    heading: 'Stream Worldwide On',
    logosDesktopUrl: '/images/Logos-Desktop-2.png',
    logosMobileUrl: '/images/Logos-Mobile-2.png',
  },
  mediaCredibility: {
    screenshots: [{ url: '/images/Screenshot-2024-10-24-at-14.30.39.png' }],
    stats: [{ text: 'Add your credibility stats here.' }],
  },
  womenInPower: {
    heading: 'SISTER SHOW TITLE',
    description: 'Describe your sister show here.',
    ctaText: 'APPLY NOW',
    ctaUrl: '#',
    imageUrl: '/images/wip-sec-img.png',
  },
  howItWorks: [
    { step: 1, title: 'Step 1', description: 'Describe step 1.' },
    { step: 2, title: 'Step 2', description: 'Describe step 2.' },
    { step: 3, title: 'Step 3', description: 'Describe step 3.' },
  ],
  threePackages: [
    { title: 'Package 1', description: 'Describe this package.', features: ['Feature A', 'Feature B'] },
    { title: 'Package 2', description: 'Describe this package.', features: ['Feature A', 'Feature B'] },
    { title: 'Package 3', description: 'Describe this package.', features: ['Feature A', 'Feature B'] },
  ],
  whyTvStats: [
    { stat: '80%', description: 'Consumer credibility stat.' },
    { stat: '44M', description: 'Annual viewer reach.' },
  ],
  aboutNetwork: {
    body: 'Describe your production company and mission.',
    logoUrl: '/images/Inside-Success-Logo.png',
  },
  team: [
    { name: 'Team Member', role: 'Role Title', imageUrl: '/images/1-Rudy-Mawer.png' },
  ],
  faq: [
    { question: 'How long does production take?', answer: 'Typically 6–12 months.' },
    { question: 'Do I need camera experience?', answer: 'No — we coach you through everything.' },
  ],
  nineConsiderations: [
    { title: '1. Consideration Title', body: 'Explain this consideration in detail.' },
  ],
  footer: {
    address: 'Your Company Address',
    privacyUrl: '/privacy',
    termsUrl: '/terms',
    disclaimer: 'Add your earnings disclaimer and legal notices here.',
  },
  theme: {
    primaryColor: '#CAA97A',
    accentColor: '#D6002A',
    fontFamily: 'Montserrat',
  },
}
