'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

const stats = [
  { label: 'Companies', value: '+200' },
  { label: 'Team members', value: '+50' },
  { label: 'Capital investment', value: '+5B' },
  { label: 'Years of experience', value: '+15' },
]

export function AboutSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <SectionLabel number="02/" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0E1435] mb-6">
              About our investment firm
            </h2>
            <Button variant="primary" size="lg" className="gap-2 mb-8">
              Pitch your startup
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-base text-gray-600 mb-6">
              Lorem ipsum dolor amet consectetur diam nulla nullam mauris turpis dis mi
              sit. In a nunc id lectus facilisi justo eu egestas amet tellus felis leo
              vestibulum ut neque mus. Tempus arcu metus.
            </p>
            <p className="text-base text-gray-600">
              Lorem ipsum dolor amet consectetur diam nulla nullam mauris turpis dis mi
              sit. In a nunc id lectus facilisi justo eu.
            </p>
          </motion.div>

          {/* Center Column - Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 flex items-center justify-center"
          >
            <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] aspect-square rounded-full overflow-hidden">
              <Image
                src="/images/DgI3Pbcg1IJBLRdyEGZKvrYQ.png"
                alt="About Our Investment Firm"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4 flex flex-col gap-8 lg:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="border-b border-gray-200 pb-6 last:border-0"
              >
                <div className="text-right">
                  <p className="text-base text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0E1435] flex items-center justify-end gap-2">
                    <span className="text-[#3354FF]">+</span>
                    <span>{stat.value.replace('+', '')}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
