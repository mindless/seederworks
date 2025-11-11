'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

const stats = [
  { label: 'Target Portfolio ROI', value: '×7.5' },
  { label: 'Target IRR', value: '+48%' },
  { label: 'Liquidity Aim', value: '~24 mo' },
  { label: 'Core Hubs', value: 'SG · TH · PH' },
]

export function AboutSection() {
  return (
    <section className="py-20 md:py-32 bg-neutral-100">
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
              Why SeederWorks
            </h2>
            <Button variant="primary" size="lg" className="gap-2 mb-8">
              Pitch your startup
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-base text-neutral-600 mb-6">
              The world doesn't need more startups—it needs <strong>better</strong> ones. We bridge bold founders and intelligent capital with hands-on build teams, market access, and data-driven decisioning. The result: companies built for longevity, not hype.
            </p>
            <div className="text-sm text-neutral-600 space-y-3">
              <p><strong>Founder-First:</strong> Aligned incentives, operational support, and fair economics.</p>
              <p><strong>Studio + Fund:</strong> Revenue from client work de-risks early venture bets.</p>
              <p><strong>SEA Edge:</strong> Born in Southeast Asia with cross-border execution DNA.</p>
              <p><strong>Data-Led:</strong> Behavioral data guides product, growth, and capital allocation.</p>
            </div>
          </motion.div>

          {/* Center Column - Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 flex items-center justify-center"
          >
            <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] aspect-square">
              <Image
                src="/images/seedertree.png"
                alt="Why SeederWorks"
                fill
                className="object-contain"
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
                className="border-b border-neutral-200 pb-6 last:border-0"
              >
                <div className="text-right">
                  <p className="text-base text-neutral-600 mb-2">{stat.label}</p>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 flex items-center justify-end gap-2">
                    {(stat.value.startsWith('×') || stat.value.startsWith('~') || stat.value.startsWith('+')) && (
                      <span className="text-brand">
                        {stat.value.startsWith('×') ? '×' : stat.value.startsWith('~') ? '~' : '+'}
                      </span>
                    )}
                    <span>{stat.value.replace(/^[+×~]/, '')}</span>
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
