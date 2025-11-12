'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlassSurface } from '@/components/ui/GlassSurface'
import PrismaticBurst from '@/components/PrismaticBurst'
import Iridescence from '@/components/Iridescence'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-neutral-100 overflow-hidden">
      {/* Background Graphic - Mobile Only */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute inset-0 w-full h-full opacity-30 lg:hidden"
      >
        <div className="absolute inset-0 w-full h-full">
          {/* Background Layer - Iridescence */}
          <div className="absolute inset-0 w-full h-full">
            <Iridescence
              color={[0.42, 0.56, 0.31]}
              speed={0.5}
              amplitude={0.15}
              mouseReact={true}
            />
          </div>

          {/* Foreground Layer - Masked Prismatic Burst */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <div
              style={{
                width: '70%',
                height: '70%',
                maskImage: 'url(/images/seederworkslogo.svg)',
                maskSize: 'contain',
                maskPosition: 'center',
                maskRepeat: 'no-repeat',
                WebkitMaskImage: 'url(/images/seederworkslogo.svg)',
                WebkitMaskSize: 'contain',
                WebkitMaskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
              }}
              className="w-full h-full"
            >
              <PrismaticBurst
                colors={['#6B8E4E', '#8FAF6E', '#9BC57D']}
                animationType="hover"
                intensity={2}
                speed={0.5}
                distort={0}
                rayCount={0}
                hoverDampness={0.25}
                mixBlendMode="normal"
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen lg:min-h-0">
          {/* Left Column - Content */}
          <div className="flex items-center justify-center lg:justify-start py-32 lg:py-0 px-6 sm:px-8 lg:pl-[calc((100vw-80rem)/2+2rem)] lg:pr-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl w-full"
            >
              <GlassSurface
                blur="lg"
                opacity={15}
                border={true}
                borderColor="rgba(255, 255, 255, 0.3)"
                shadow={true}
                className="lg:bg-transparent lg:backdrop-blur-none lg:border-0 lg:shadow-none p-8 lg:p-0 rounded-2xl lg:rounded-none text-center lg:text-left"
              >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 lg:text-neutral-800 mb-6 leading-tight">
                We build founders, not just startups.
              </h1>
              <p className="text-lg text-white lg:text-neutral-600 mb-8 max-w-xl">
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
              <div className="flex flex-col sm:flex-row gap-6 text-sm text-white/90 lg:text-neutral-600">
                <div className="flex items-center gap-2">
                  <span>Early liquidity aim:</span>
                  <span className="font-semibold text-white lg:text-neutral-800">~24 months</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Target:</span>
                  <span className="font-semibold text-white lg:text-neutral-800">7.5× ROI · 48% IRR</span>
                </div>
              </div>
              </GlassSurface>
            </motion.div>
          </div>

          {/* Right Column - Layered Effects (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block relative lg:min-h-screen"
          >
            <div className="absolute inset-0 w-full h-full">
              {/* Background Layer - Iridescence */}
              <div className="absolute inset-0 w-full h-full">
                <Iridescence
                  color={[0.42, 0.56, 0.31]}
                  speed={0.5}
                  amplitude={0.15}
                  mouseReact={true}
                />
              </div>

              {/* Foreground Layer - Masked Prismatic Burst */}
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <div
                  style={{
                    width: '70%',
                    height: '70%',
                    maskImage: 'url(/images/seederworkslogo.svg)',
                    maskSize: 'contain',
                    maskPosition: 'center',
                    maskRepeat: 'no-repeat',
                    WebkitMaskImage: 'url(/images/seederworkslogo.svg)',
                    WebkitMaskSize: 'contain',
                    WebkitMaskPosition: 'center',
                    WebkitMaskRepeat: 'no-repeat',
                  }}
                  className="w-full h-full"
                >
                  <PrismaticBurst
                    colors={['#6B8E4E', '#8FAF6E', '#9BC57D']}
                    animationType="hover"
                    intensity={2}
                    speed={0.5}
                    distort={0}
                    rayCount={0}
                    hoverDampness={0.25}
                    mixBlendMode="normal"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
