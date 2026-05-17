import content from '@/content.json'
import type { ContentJson } from '@/lib/types'
import Hero from '@/components/sections/Hero'
import Cast from '@/components/sections/Cast'
import SeriesInfo from '@/components/sections/SeriesInfo'
import WhoFor from '@/components/sections/WhoFor'
import WhoNotFor from '@/components/sections/WhoNotFor'

const c = content as ContentJson

export default function LandingPage() {
  return (
    <div className="containerWrapper" style={{ fontFamily: c.theme.fontFamily + ', Helvetica, sans-serif' }}>
      <Hero hero={c.hero} theme={c.theme} />
      <Cast cast={c.cast} theme={c.theme} />
      <SeriesInfo seriesInfo={c.seriesInfo} hero={c.hero} theme={c.theme} />
      <WhoFor whoFor={c.whoFor} theme={c.theme} />
      <WhoNotFor whoNotFor={c.whoNotFor} />
    </div>
  )
}
