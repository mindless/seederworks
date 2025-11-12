'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const logos = [
  { name: 'Founder First', width: 200, height: 34 },
  { name: 'Capital Efficient', width: 220, height: 34 },
  { name: 'AI Driven', width: 150, height: 34 },
  { name: 'Data-Led', width: 150, height: 34 },
]

export function LogoCarousel() {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos]
  const [isVisible, setIsVisible] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const controls = useAnimation()

  // Viewport detection
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries[0].isIntersecting
        setIsVisible(visible)

        if (visible) {
          // Resume animation
          controls.start({
            x: [0, -100 * logos.length],
            transition: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          })
        } else {
          // Pause animation
          controls.stop()
        }
      },
      { root: null, threshold: 0.01 }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [controls])

  return (
    <section ref={sectionRef} className="py-16 bg-neutral-50 overflow-hidden">
      <div className="relative">
        <motion.div
          className="flex gap-24"
          animate={controls}
          initial={{ x: 0 }}
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
