'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card, CardContent } from '@/components/ui/Card'

const industries = [
  {
    id: '1',
    name: 'AI Systems & Agents',
    icon: '/images/ai-systems-agents.png',
    description:
      'Voice + workflow agents that automate intelligence across sales, ops, and CX.',
  },
  {
    id: '2',
    name: 'Digital IP & Platforms',
    icon: '/images/digital-ip-platforms.png',
    description:
      'Ownable IP and platforms in media, commerce, and gaming with network effects.',
  },
  {
    id: '3',
    name: 'Data-Driven Ventures',
    icon: '/images/data-driven-ventures.png',
    description:
      'Behavioral data informs product bets, growth loops, and capital allocation.',
  },
]

export function IndustriesSection() {
  return (
    <section className="py-20 md:py-32 bg-neutral-100">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
            Focus Areas
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="relative w-full h-48 mb-6">
                    <Image
                      src={industry.icon}
                      alt={industry.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-800 mb-4">{industry.name}</h3>
                  <p className="text-neutral-600">{industry.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
