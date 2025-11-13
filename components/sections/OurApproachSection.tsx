'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

const approachSteps = [
  {
    number: '01',
    title: 'Discover',
    description: 'We start by deeply understanding your business challenge and the specific problems you need to solve. Through collaborative workshops and stakeholder interviews, we assess your data readiness, identify key opportunities, and validate that your organization has the foundation needed to build successful AI solutions.',
    image: '/images/approach-discovery.png',
  },
  {
    number: '02',
    title: 'Prototype',
    description: 'Our team rapidly builds a working AI model tailored to your specific use case, typically delivering results within 2-3 weeks. We focus on proving viability through hands-on experimentation, testing core assumptions, and iterating based on real-world feedback to ensure we\'re solving the right problem before scaling.',
    image: '/images/approach-validation.png',
  },
  {
    number: '03',
    title: 'Deploy',
    description: 'We seamlessly integrate the validated AI solution into your existing systems and workflows, ensuring minimal disruption to your operations. Our deployment process includes comprehensive monitoring setup, performance tracking against key KPIs, and establishing feedback loops to measure real-world impact and ROI.',
    image: '/images/approach-growth.png',
  },
  {
    number: '04',
    title: 'Maintain',
    description: 'We provide ongoing support to optimize your AI systems continuously, adapting to changing business needs and evolving data patterns. Through regular performance reviews, model refinement, and proactive maintenance, we ensure your AI solutions deliver lasting value and remain competitive as your business grows.',
    image: '/images/approach-scale.png',
  },
]

export function OurApproachSection() {
  const [currentStep, setCurrentStep] = useState(0)

  const handlePrev = () => {
    setCurrentStep((prev) => (prev === 0 ? approachSteps.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentStep((prev) => (prev === approachSteps.length - 1 ? 0 : prev + 1))
  }

  const step = approachSteps[currentStep]

  return (
    <section className="py-20 md:py-32 bg-white">
      <Container>
        {/* Header Area */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12 md:mb-16">
          {/* Left side - Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800"
          >
            Our Approach
          </motion.h2>

          {/* Right side - Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <Button variant="primary" size="default" className="gap-2">
              Pitch your startup
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="default">
              Learn more
            </Button>
          </motion.div>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
              >
                {/* Placeholder gradient - replace with actual images */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl md:text-8xl font-bold text-white/30">
                    {step.number}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right Side - Step Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Large Step Number */}
                <div className="text-8xl md:text-9xl font-bold text-neutral-200 leading-none">
                  {step.number}
                </div>

                {/* Step Heading */}
                <h3 className="text-3xl md:text-4xl font-bold text-neutral-800">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Pill-shaped Navigation Control */}
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 border border-neutral-300 rounded-full px-2 py-2">
                <button
                  onClick={handlePrev}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors duration-200"
                  aria-label="Previous step"
                >
                  <ChevronLeft className="w-5 h-5 text-neutral-700" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors duration-200"
                  aria-label="Next step"
                >
                  <ChevronRight className="w-5 h-5 text-neutral-700" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
