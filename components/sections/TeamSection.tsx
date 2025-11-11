'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Card, CardContent } from '@/components/ui/Card'

const teamMembers = [
  {
    id: '1',
    name: 'John Carter',
    title: 'Managing Partner',
    bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    avatar: '/images/7DYLiZWpACW1c0Fv7lHTWRo8ww4.png',
  },
  {
    id: '2',
    name: 'Sophie Moore',
    title: 'Senior Partner',
    bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    avatar: '/images/jnCfcpID73swqHNlfJM9uIJGn0.png',
  },
  {
    id: '3',
    name: 'Matt Cannon',
    title: 'Investment Partner',
    bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    avatar: '/images/sBcvvIGTE8eSdzDUDnl0K9HbI0I.png',
  },
  {
    id: '4',
    name: 'Andy Smith',
    title: 'Venture Partner',
    bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
    avatar: '/images/r3uyxQxzBjpymGALfguWeKun6o.png',
  },
]

export function TeamSection() {
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
            Our partners
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">{member.name}</h3>
                  <p className="text-sm text-brand font-medium mb-3">{member.title}</p>
                  <p className="text-neutral-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/team"
            className="text-brand hover:text-brand-dark font-medium transition-colors"
          >
            Browse all team members →
          </a>
        </div>
      </Container>
    </section>
  )
}
