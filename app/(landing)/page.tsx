import content from "@/content.json";
import type { ContentJson } from "@/lib/types";
import Hero from "@/components/sections/Hero";
import SeriesInfo from "@/components/sections/SeriesInfo";
import AboutShow from "@/components/sections/AboutShow";
import WhoFor from "@/components/sections/WhoFor";
import WhoNotFor from "@/components/sections/WhoNotFor";
import JoinShow from "@/components/sections/JoinShow";
import BeingFeatured from "@/components/sections/BeingFeatured";
import TrustedMedia from "@/components/sections/TrustedMedia";
import LegendsLineup from "@/components/sections/LegendsLineup";
import OtherShows from "@/components/sections/OtherShows";
import TvPackageIncluded from "@/components/sections/TvPackageIncluded";
import BigScreen from "@/components/sections/BigScreen";
import PressAwards from "@/components/sections/PressAwards";
import Transformation from "@/components/sections/Transformation";
import ItsTime from "@/components/sections/ItsTime";
import HowItWorks from "@/components/sections/HowItWorks";
import AboutNetwork from "@/components/sections/AboutNetwork";
import Faq from "@/components/sections/Faq";
import NineConsiderations from "@/components/sections/NineConsiderations";
import Footer from "@/components/sections/Footer";
import NavBar from "@/components/sections/NavBar";

const c = content as ContentJson;

export default function LandingPage() {
  return (
    <div
      className="containerWrapper"
      style={{ fontFamily: c.theme.fontFamily + ", Helvetica, sans-serif" }}
    >
      <NavBar ctaUrl={c.joinShow.ctaUrl} announcementText={c.navBar.announcementText} ctaText={c.navBar.ctaText} />
      <Hero hero={c.hero} theme={c.theme} />
      <SeriesInfo seriesInfo={c.seriesInfo} />
      <div
        className="parallax-bg"
        style={{
          backgroundImage: c.whoFor.bgImageUrl ? `url(${c.whoFor.bgImageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#000",
          paddingTop: 60,
          paddingBottom: 130,
          marginTop: -5,
        }}
      >
        <WhoFor whoFor={c.whoFor} theme={c.theme} />
        <WhoNotFor whoNotFor={c.whoNotFor} />
        <JoinShow
          joinShow={c.joinShow}
          imageUrl="/images/Screenshot-2026-03-04-at-11.39.00-AM-1--1-.png"
        />
        <Transformation
          transformation={c.transformation}
          hero={c.hero}
          theme={c.theme}
        />
      </div>
      <div
        className="parallax-bg"
        style={{
          backgroundImage: c.itsTime.bgImageUrl ? `url(${c.itsTime.bgImageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#5a4a3a",
          paddingTop: 20,
          paddingBottom: 75,
        }}
      >
        <ItsTime itsTime={c.itsTime} />
        <JoinShow
          joinShow={c.joinShow}
          imageUrl="/images/calendar-u.png"
          headlineColor="#000"
          subheadlineColor="rgb(102, 69, 46)"
        />
      </div>
      <BeingFeatured beingFeatured={c.beingFeatured} />
      <TrustedMedia trustedMedia={c.trustedMedia} />
      <LegendsLineup legendsLineup={c.legendsLineup} />
      <OtherShows otherShows={c.otherShows} />
      <TvPackageIncluded tvPackageIncluded={c.tvPackageIncluded} />
      <BigScreen bigScreen={c.bigScreen} />
      <PressAwards pressAwards={c.pressAwards} />
      <div
        className="parallax-bg"
        style={{
          backgroundImage: c.aboutShow.bgImageUrl ? `url(${c.aboutShow.bgImageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#000",
        }}
      >
        <AboutShow aboutShow={c.aboutShow} />
      </div>
      <div
        className="parallax-bg"
        style={{
          backgroundImage: c.howItWorks.bgImageUrl ? `url(${c.howItWorks.bgImageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgb(142, 123, 107)",
          paddingTop: 70,
          paddingBottom: 65,
        }}
      >
        <HowItWorks howItWorks={c.howItWorks} />
        <JoinShow
          joinShow={c.joinShow}
          imageUrl="/images/Screenshot-2026-03-04-at-11.39.00-AM-1--1-.png"
          headlineColor="#000"
          subheadlineColor="rgb(102, 69, 46)"
        />
      </div>
      <AboutNetwork aboutNetwork={c.aboutNetwork} theme={c.theme} />
      <div
        className="parallax-bg"
        style={{
          backgroundImage: c.faq.bgImageUrl ? `url(${c.faq.bgImageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgb(102, 69, 46)",
          paddingTop: 20,
          paddingBottom: 60,
        }}
      >
        <Faq faq={c.faq} theme={c.theme} />
        <JoinShow
          joinShow={c.joinShow}
          imageUrl="/images/calendar-u.png"
          headlineColor="#fff"
          subheadlineColor="rgba(255, 234, 180, 0.98)"
        />
        <NineConsiderations
          nineConsiderations={c.nineConsiderations}
          theme={c.theme}
        />
      </div>
      <Footer footer={c.footer} />
    </div>
  );
}
