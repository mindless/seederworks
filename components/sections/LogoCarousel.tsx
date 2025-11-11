'use client'

import { motion } from 'framer-motion'

const logos = [
  { name: 'Founder First', width: 200, height: 34 },
  { name: 'Capital Efficient', width: 220, height: 34 },
  { name: 'AI Driven', width: 150, height: 34 },
  { name: 'Data-Led', width: 150, height: 34 },
]

export function LogoCarousel() {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos]

  return (
    <section className="py-16 bg-neutral-50 overflow-hidden">
      <div className="relative">
        <motion.div
          className="flex gap-24"
          animate={{
            x: [0, -100 * logos.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center flex-shrink-0 text-neutral-400"
              style={{ width: logo.width, height: logo.height }}
            >
              <span className="text-2xl font-bold">{logo.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
