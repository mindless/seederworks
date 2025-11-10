'use client'

import { motion } from 'framer-motion'

const logos = [
  { name: 'Company', width: 183, height: 34 },
  { name: 'Startup', width: 151, height: 28 },
  { name: 'Enterprise', width: 190, height: 34 },
  { name: 'Venture', width: 149, height: 32 },
  { name: 'Organization', width: 230, height: 33 },
]

export function LogoCarousel() {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos]

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
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
              className="flex items-center justify-center flex-shrink-0 text-gray-400"
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
