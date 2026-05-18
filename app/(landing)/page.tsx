import content from '@/content.json'
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
import NavBar from '@/components/sections/NavBar'

const c = content as ContentJson

export default function LandingPage() {
  return (
    <div className="containerWrapper" style={{ fontFamily: c.theme.fontFamily + ', Helvetica, sans-serif' }}>
      <NavBar ctaUrl={c.hero.ctaUrl} />
      <Hero hero={c.hero} theme={c.theme} />
      <Cast cast={c.cast} theme={c.theme} />
      <SeriesInfo seriesInfo={c.seriesInfo} hero={c.hero} theme={c.theme} />
      <WhoFor whoFor={c.whoFor} theme={c.theme} />
      <WhoNotFor whoNotFor={c.whoNotFor} />
      <Transformation transformation={c.transformation} hero={c.hero} theme={c.theme} />
      <ProblemSolution problemSolution={c.problemSolution} />
      <AboutShow aboutShow={c.aboutShow} theme={c.theme} />
      <TvPackages tvPackages={c.tvPackages} hero={c.hero} theme={c.theme} />
      <StreamingPlatforms streamingPlatforms={c.streamingPlatforms} />
      <MediaCredibility mediaCredibility={c.mediaCredibility} theme={c.theme} />
      <WomenInPower womenInPower={c.womenInPower} theme={c.theme} />
      <HowItWorks howItWorks={c.howItWorks} theme={c.theme} />
      <ThreePackageOptions threePackages={c.threePackages} hero={c.hero} theme={c.theme} />
      <WhyTvStats whyTvStats={c.whyTvStats} theme={c.theme} />
      <AboutNetwork aboutNetwork={c.aboutNetwork} theme={c.theme} />
      <Team team={c.team} theme={c.theme} />
      <Faq faq={c.faq} theme={c.theme} />
      <NineConsiderations nineConsiderations={c.nineConsiderations} theme={c.theme} />
      <Footer footer={c.footer} />
    </div>
  )
}
