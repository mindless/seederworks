'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Card, CardContent } from '@/components/ui/Card'

const teamMembers = [
  {
    id: '1',
    name: 'Ferdinand Gutierrez',
    role: 'CEO',
    title: 'HEAD SWV LEAD',
    bio: 'Founder, CEO with 20+ years experience. 2 exits',
    avatar: '/images/team/ferdi.jpg',
  },
  {
    id: '2',
    name: 'Nam Do',
    role: 'COO',
    title: 'HEAD SWS LEAD',
    bio: 'Ex-Google, Line, DKSH. Systems Architect',
    avatar: '/images/team/nam.jpg',
  },
  {
    id: '3',
    name: 'Marco Palinar',
    role: 'CPO',
    title: 'HEAD PRODUCT AND AI',
    bio: 'Led Product at Angkas, Brankas',
    avatar: '/images/team/marco.jpg',
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
            World Class Leadership Team
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-2">{member.name}</h3>
                  <p className="text-sm text-brand font-medium mb-3">{member.title}</p>
                  <p className="text-neutral-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
