'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

const portfolioItems = [
  {
    id: '1',
    name: 'SnapSell',
    icon: '/images/Rt3f2BMBCoQiScIkRbMOrpebi6c.png',
    description: 'Trust-first social commerce with escrow.',
    hoverColor: 'hover:bg-violet-100',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: '2',
    name: 'RunwaySpot',
    icon: '/images/AwCbVo0lK8X5P5WgD9SRIBDmk9o.png',
    description: 'Casting made simple for SEA\'s creator economy.',
    hoverColor: 'hover:bg-indigo-500',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: '3',
    name: 'Vox Studios',
    icon: '/images/hqW0C4mTfYq9x5KTwODoaqZ84Jg.png',
    description: 'Voice-driven AI agents for real conversations.',
    hoverColor: 'hover:bg-blue-100',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: '4',
    name: 'Zuma',
    icon: '/images/9jvs0K4uPZE1BB0TEVhNoK1vns.png',
    description: 'Family experience IP that bridges generations.',
    hoverColor: 'hover:bg-purple-100',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: '5',
    name: 'NoLMTZ',
    icon: '/images/gYcHetNLP85EpoinJaI2AhLL8dU.png',
    description: 'Video games designed for neurodiverse minds.',
    hoverColor: 'hover:bg-pink-100',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
  {
    id: '6',
    name: 'Project Artemis',
    icon: '/images/gYcHetNLP85EpoinJaI2AhLL8dU.png',
    description: 'AI for insurance distribution and retention.',
    hoverColor: 'hover:bg-slate-100',
    gridClass: 'md:col-span-1 md:row-span-1',
  },
]

export function PortfolioSection() {
  return (
    <section className="py-20 md:py-32 bg-neutral-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
            Our Portfolio
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 auto-rows-[280px]">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`group relative ${item.gridClass}`}
            >
              <div className={`h-full rounded-2xl border border-neutral-200 bg-white transition-all duration-300 ${item.hoverColor} hover:border-transparent relative overflow-hidden`}>
                {/* Arrow Icon */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <ArrowUpRight className="w-6 h-6 text-neutral-800" />
                </div>

                {/* Centered Icon */}
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="relative w-16 h-16">
                    <Image src={item.icon} alt={item.name} fill className="object-contain" />
                  </div>
                </div>

                {/* Bottom-left Content */}
                <div className="absolute bottom-0 left-0 p-8 transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-xl font-bold text-neutral-800 mb-3">{item.name}</h3>
                  <p className="text-sm text-neutral-600">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="secondary" size="lg">
            Browse investment portfolio
          </Button>
        </div>
      </Container>
    </section>
  )
}
