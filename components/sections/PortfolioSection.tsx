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
    name: 'Company',
    icon: '/images/Rt3f2BMBCoQiScIkRbMOrpebi6c.png',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
  },
  {
    id: '2',
    name: 'Startup',
    icon: '/images/AwCbVo0lK8X5P5WgD9SRIBDmk9o.png',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
  },
  {
    id: '3',
    name: 'Organization',
    icon: '/images/hqW0C4mTfYq9x5KTwODoaqZ84Jg.png',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
  },
  {
    id: '4',
    name: 'Enterprise',
    icon: '/images/9jvs0K4uPZE1BB0TEVhNoK1vns.png',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
  },
  {
    id: '5',
    name: 'Venture',
    icon: '/images/gYcHetNLP85EpoinJaI2AhLL8dU.png',
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
  },
]

export function PortfolioSection() {
  return (
    <section className="py-20 md:py-32 bg-gray-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionLabel number="03/" className="justify-center" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0E1435] mb-6">
            Our portfolio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sollicitudin pulvinar ipsum ut
            senectus malesuada dui lorem.
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
                  <h3 className="text-xl font-bold text-[#0E1435] mb-3">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
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
