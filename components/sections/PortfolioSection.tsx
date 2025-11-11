'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

const portfolioItems = [
  {
    id: '1',
    name: 'SnapSell',
    icon: '/images/Rt3f2BMBCoQiScIkRbMOrpebi6c.png',
    description: 'Trust-first social commerce with escrow.',
  },
  {
    id: '2',
    name: 'RunwaySpot',
    icon: '/images/AwCbVo0lK8X5P5WgD9SRIBDmk9o.png',
    description: 'Casting made simple for SEA\'s creator economy.',
  },
  {
    id: '3',
    name: 'Vox Studios',
    icon: '/images/hqW0C4mTfYq9x5KTwODoaqZ84Jg.png',
    description: 'Voice-driven AI agents for real conversations.',
  },
  {
    id: '4',
    name: 'Zuma',
    icon: '/images/9jvs0K4uPZE1BB0TEVhNoK1vns.png',
    description: 'Family experience IP that bridges generations.',
  },
  {
    id: '5',
    name: 'NoLMTZ',
    icon: '/images/gYcHetNLP85EpoinJaI2AhLL8dU.png',
    description: 'Video games designed for neurodiverse minds.',
  },
  {
    id: '6',
    name: 'Project Artemis',
    icon: '/images/gYcHetNLP85EpoinJaI2AhLL8dU.png',
    description: 'AI for insurance distribution and retention.',
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
            Ventures in Motion
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            A living portfolio of seeds and spin-outs from our studio network.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="relative w-16 h-16 mb-6">
                    <Image src={item.icon} alt={item.name} fill className="object-contain" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-3">{item.name}</h3>
                  <p className="text-neutral-600">{item.description}</p>
                </CardContent>
              </Card>
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
