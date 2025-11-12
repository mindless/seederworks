'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export function CtaSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/9MqkTFllsi6yJ19DXmO3Se1OVvk.png"
          alt="CTA Background"
          fill
          className="object-cover opacity-10"
        />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6">
            We invest in the companies of the future, today
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Sollicitudin pulvinar ipsum ut senectus
            malesuada dui lorem ac id vel nunc sapien magna.
          </p>
          <Button variant="primary" size="lg">
            Pitch your startup
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}
