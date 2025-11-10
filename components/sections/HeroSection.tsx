'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:min-h-0">
          {/* Left Column - Content */}
          <div className="flex items-center py-32 lg:py-0 px-4 sm:px-6 lg:pl-[calc((100vw-80rem)/2+2rem)] lg:pr-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <SectionLabel number="Where Capital Meets Creation" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0E1435] mb-6 leading-tight">
                We build founders, not just startups.
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                SeederWorks is an AI Venture Studio & Fund. We seed, build, and scale high-potential companies across Southeast Asia—faster, smarter, founder-first.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button variant="primary" size="lg" className="gap-2">
                  Explore Ventures
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="secondary" size="lg">
                  Invest with Us
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>Early liquidity aim:</span>
                  <span className="font-semibold text-[#0E1435]">~24 months</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Target:</span>
                  <span className="font-semibold text-[#0E1435]">7.5× ROI · 48% IRR</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative min-h-[400px] lg:min-h-screen"
          >
            <Image
              src="/images/wps0HzfeV0ccLuQRpWAByO5xUsE.png"
              alt="We Invest In The Companies Of The Future"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
