'use client'
import type { ContentJson } from '@/lib/types'
import Hero from '@/components/sections/Hero'
import Cast from '@/components/sections/Cast'
import SeriesInfo from '@/components/sections/SeriesInfo'
import WhoFor from '@/components/sections/WhoFor'
import WhoNotFor from '@/components/sections/WhoNotFor'
import Transformation from '@/components/sections/Transformation'
import ProblemSolution from '@/components/sections/ProblemSolution'
import AboutShow from '@/components/sections/AboutShow'
import TvPackages from '@/components/sections/TvPackages'
import StreamingPlatforms from '@/components/sections/StreamingPlatforms'
import MediaCredibility from '@/components/sections/MediaCredibility'
import WomenInPower from '@/components/sections/WomenInPower'
import HowItWorks from '@/components/sections/HowItWorks'
import ThreePackageOptions from '@/components/sections/ThreePackageOptions'
import WhyTvStats from '@/components/sections/WhyTvStats'
import AboutNetwork from '@/components/sections/AboutNetwork'
import Team from '@/components/sections/Team'
import Faq from '@/components/sections/Faq'
import NineConsiderations from '@/components/sections/NineConsiderations'
import Footer from '@/components/sections/Footer'

type Props = { content: ContentJson; activeSection: string }

export default function LivePreview({ content: c, activeSection }: Props) {
  const sectionIds: Record<string, string> = {
    hero: 'preview-hero',
    cast: 'preview-cast',
    seriesInfo: 'preview-series',
    whoFor: 'preview-whofor',
    whoNotFor: 'preview-whonotfor',
    transformation: 'preview-transformation',
    problemSolution: 'preview-problem',
    aboutShow: 'preview-about',
    tvPackages: 'preview-packages',
    streamingPlatforms: 'preview-streaming',
    mediaCredibility: 'preview-media',
    womenInPower: 'preview-wip',
    howItWorks: 'preview-how',
    threePackages: 'preview-three',
    whyTvStats: 'preview-why',
    aboutNetwork: 'preview-network',
    team: 'preview-team',
    faq: 'preview-faq',
    nineConsiderations: 'preview-nine',
    footer: 'preview-footer',
  }

  return (
    <div
      className="overflow-y-auto h-full"
      style={{ fontFamily: c.theme.fontFamily + ', Helvetica, sans-serif', fontSize: '60%', transformOrigin: 'top left' }}
    >
      <div id={sectionIds.hero}><Hero hero={c.hero} theme={c.theme} /></div>
      <div id={sectionIds.cast}><Cast cast={c.cast} theme={c.theme} /></div>
      <div id={sectionIds.seriesInfo}><SeriesInfo seriesInfo={c.seriesInfo} hero={c.hero} theme={c.theme} /></div>
      <div id={sectionIds.whoFor}><WhoFor whoFor={c.whoFor} theme={c.theme} /></div>
      <div id={sectionIds.whoNotFor}><WhoNotFor whoNotFor={c.whoNotFor} /></div>
      <div id={sectionIds.transformation}><Transformation transformation={c.transformation} hero={c.hero} theme={c.theme} /></div>
      <div id={sectionIds.problemSolution}><ProblemSolution problemSolution={c.problemSolution} /></div>
      <div id={sectionIds.aboutShow}><AboutShow aboutShow={c.aboutShow} theme={c.theme} /></div>
      <div id={sectionIds.tvPackages}><TvPackages tvPackages={c.tvPackages} hero={c.hero} theme={c.theme} /></div>
      <div id={sectionIds.streamingPlatforms}><StreamingPlatforms streamingPlatforms={c.streamingPlatforms} /></div>
      <div id={sectionIds.mediaCredibility}><MediaCredibility mediaCredibility={c.mediaCredibility} theme={c.theme} /></div>
      <div id={sectionIds.womenInPower}><WomenInPower womenInPower={c.womenInPower} theme={c.theme} /></div>
      <div id={sectionIds.howItWorks}><HowItWorks howItWorks={c.howItWorks} theme={c.theme} /></div>
      <div id={sectionIds.threePackages}><ThreePackageOptions threePackages={c.threePackages} hero={c.hero} theme={c.theme} /></div>
      <div id={sectionIds.whyTvStats}><WhyTvStats whyTvStats={c.whyTvStats} theme={c.theme} /></div>
      <div id={sectionIds.aboutNetwork}><AboutNetwork aboutNetwork={c.aboutNetwork} theme={c.theme} /></div>
      <div id={sectionIds.team}><Team team={c.team} theme={c.theme} /></div>
      <div id={sectionIds.faq}><Faq faq={c.faq} theme={c.theme} /></div>
      <div id={sectionIds.nineConsiderations}><NineConsiderations nineConsiderations={c.nineConsiderations} theme={c.theme} /></div>
      <div id={sectionIds.footer}><Footer footer={c.footer} /></div>
    </div>
  )
}
