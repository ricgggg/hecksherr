import HeroSection from "@/components/HeroSection";
import ServicesStrip from "@/components/ServicesStrip";
import WhatSetsUsApart from "@/components/WhatSetsUsApart";
import SustainabilitySection from "@/components/SustainabilitySection";
import NewsSection from "@/components/NewsSection";
import AboutTeaserSection from "@/components/AboutTeaserSection";
import JoinCTASection from "@/components/JoinCTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesStrip />
      <WhatSetsUsApart />
      <SustainabilitySection />
      <NewsSection />
      <AboutTeaserSection />
      <JoinCTASection />
    </>
  );
}