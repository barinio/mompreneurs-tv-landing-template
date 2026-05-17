import type { Metadata } from 'next'
import content from '@/content.json'
import type { ContentJson } from '@/lib/types'

const c = content as ContentJson

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: c.meta.title,
    description: c.meta.description,
    openGraph: {
      title: c.meta.title,
      description: c.meta.description,
      images: [c.meta.seoImageUrl],
    },
    icons: { icon: c.meta.faviconUrl },
  }
}

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="stylesheet" href="/css/lander.css" />
      <link rel="stylesheet" href="/css/all.css" />
      <link rel="stylesheet" href="/css/v4-shims.css" />
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Oswald:wght@400;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  )
}
