'use client'
import { useEffect, useRef } from 'react'
import type { ContentJson, SectionKey } from '@/lib/types'
import NavBar from '@/components/sections/NavBar'
import Hero from '@/components/sections/Hero'
import SeriesInfo from '@/components/sections/SeriesInfo'
import WhoFor from '@/components/sections/WhoFor'
import WhoNotFor from '@/components/sections/WhoNotFor'
import JoinShow from '@/components/sections/JoinShow'
import Transformation from '@/components/sections/Transformation'
import ItsTime from '@/components/sections/ItsTime'
import BeingFeatured from '@/components/sections/BeingFeatured'
import TrustedMedia from '@/components/sections/TrustedMedia'
import LegendsLineup from '@/components/sections/LegendsLineup'
import OtherShows from '@/components/sections/OtherShows'
import TvPackageIncluded from '@/components/sections/TvPackageIncluded'
import BigScreen from '@/components/sections/BigScreen'
import PressAwards from '@/components/sections/PressAwards'
import AboutShow from '@/components/sections/AboutShow'
import HowItWorks from '@/components/sections/HowItWorks'
import AboutNetwork from '@/components/sections/AboutNetwork'
import Faq from '@/components/sections/Faq'
import NineConsiderations from '@/components/sections/NineConsiderations'
import Footer from '@/components/sections/Footer'

type Props = { content: ContentJson; activeSection: SectionKey }

export default function LivePreview({ content: c, activeSection }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current.querySelector<HTMLElement>(`[data-section="${activeSection}"]`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [activeSection])

  function sec(key: SectionKey, children: React.ReactNode, extraStyle?: React.CSSProperties) {
    const isActive = activeSection === key
    return (
      <div
        data-section={key}
        style={{
          ...extraStyle,
          outline: isActive ? '3px solid #2563eb' : undefined,
          outlineOffset: isActive ? '-3px' : undefined,
          position: 'relative',
        }}
      >
        {isActive && (
          <div style={{
            position: 'absolute', top: 0, left: 0, zIndex: 100,
            background: '#2563eb', color: '#fff',
            fontSize: 10, fontFamily: 'system-ui', fontWeight: 600,
            padding: '2px 7px', borderBottomRightRadius: 4, pointerEvents: 'none',
          }}>
            {key}
          </div>
        )}
        {children}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto h-full"
      style={{ fontFamily: c.theme.fontFamily + ', Helvetica, sans-serif', fontSize: '60%', transformOrigin: 'top left' }}
    >
      {sec('navBar', <NavBar ctaUrl={c.joinShow.ctaUrl} announcementText={c.navBar.announcementText} ctaText={c.navBar.ctaText} />)}
      {sec('hero', <Hero hero={c.hero} theme={c.theme} />)}
      {sec('seriesInfo', <SeriesInfo seriesInfo={c.seriesInfo} />)}
      <div
        style={{
          backgroundImage: 'url(/images/Sec-BG-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#000',
          paddingTop: 60,
          paddingBottom: 130,
          marginTop: -5,
        }}
      >
        {sec('whoFor', <WhoFor whoFor={c.whoFor} theme={c.theme} />)}
        {sec('whoNotFor', <WhoNotFor whoNotFor={c.whoNotFor} />)}
        {sec('joinShow', <JoinShow joinShow={c.joinShow} imageUrl="/images/Screenshot-2026-03-04-at-11.39.00-AM-1--1-.png" />)}
        {sec('transformation', <Transformation transformation={c.transformation} hero={c.hero} theme={c.theme} />)}
      </div>
      <div
        style={{
          backgroundImage: 'url(/images/Sec-BG-3.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#5a4a3a',
          paddingTop: 20,
          paddingBottom: 75,
        }}
      >
        {sec('itsTime', <ItsTime itsTime={c.itsTime} />)}
        {sec('joinShow', <JoinShow joinShow={c.joinShow} imageUrl="/images/calendar-u.png" headlineColor="#000" subheadlineColor="rgb(102, 69, 46)" />)}
      </div>
      {sec('beingFeatured', <BeingFeatured beingFeatured={c.beingFeatured} />)}
      {sec('trustedMedia', <TrustedMedia trustedMedia={c.trustedMedia} />)}
      {sec('legendsLineup', <LegendsLineup legendsLineup={c.legendsLineup} />)}
      {sec('otherShows', <OtherShows otherShows={c.otherShows} />)}
      {sec('tvPackageIncluded', <TvPackageIncluded tvPackageIncluded={c.tvPackageIncluded} />)}
      {sec('bigScreen', <BigScreen bigScreen={c.bigScreen} />)}
      {sec('pressAwards', <PressAwards pressAwards={c.pressAwards} />)}
      <div
        style={{
          backgroundImage: 'url(/images/Sec-BG-6.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#000',
        }}
      >
        {sec('aboutShow', <AboutShow aboutShow={c.aboutShow} />)}
      </div>
      <div
        style={{
          backgroundImage: 'url(/images/Sec-BG-5.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgb(142, 123, 107)',
          paddingTop: 70,
          paddingBottom: 65,
        }}
      >
        {sec('howItWorks', <HowItWorks howItWorks={c.howItWorks} />)}
      </div>
      {sec('aboutNetwork', <AboutNetwork aboutNetwork={c.aboutNetwork} theme={c.theme} />)}
      <div
        style={{
          backgroundImage: 'url(/images/Sec-BG-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'rgb(102, 69, 46)',
          paddingTop: 20,
          paddingBottom: 60,
        }}
      >
        {sec('faq', <Faq faq={c.faq} theme={c.theme} />)}
        {sec('nineConsiderations', <NineConsiderations nineConsiderations={c.nineConsiderations} theme={c.theme} />)}
      </div>
      {sec('footer', <Footer footer={c.footer} />)}
    </div>
  )
}
