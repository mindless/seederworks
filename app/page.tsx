import { HeroSection } from '@/components/sections/HeroSection'
import { LogoCarousel } from '@/components/sections/LogoCarousel'
import { AboutSection } from '@/components/sections/AboutSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { IndustriesSection } from '@/components/sections/IndustriesSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { TeamSection } from '@/components/sections/TeamSection'
import { BlogSection } from '@/components/sections/BlogSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogoCarousel />
      <AboutSection />
      <PortfolioSection />
      <IndustriesSection />
      <CtaSection />
      <TeamSection />
      <BlogSection />
    </>
  )
}
