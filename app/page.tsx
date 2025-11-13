import { HeroSection } from '@/components/sections/HeroSection'
import { LogoCarousel } from '@/components/sections/LogoCarousel'
import { AboutSection } from '@/components/sections/AboutSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { IndustriesSection } from '@/components/sections/IndustriesSection'
import { OurApproachSection } from '@/components/sections/OurApproachSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { TeamSection } from '@/components/sections/TeamSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoCarousel />
      <AboutSection />
      <OurApproachSection />
      <PortfolioSection />
      <IndustriesSection />
      <CtaSection />
      <TeamSection />
    </>
  )
}
