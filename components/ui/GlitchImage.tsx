'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { FaultyTerminal } from './FaultyTerminal'
import { cn } from '@/lib/utils'

export interface GlitchImageProps {
  /**
   * Image source
   */
  src: string
  /**
   * Alt text for image
   */
  alt: string
  /**
   * Optional className for container
   */
  className?: string
  /**
   * Time before auto-trigger in milliseconds
   * @default 30000 (30 seconds)
   */
  autoTriggerDelay?: number
  /**
   * Duration of glitch effect in milliseconds
   * @default 2000 (2 seconds)
   */
  glitchDuration?: number
  /**
   * Glitch intensity (1-10)
   * @default 7
   */
  glitchIntensity?: number
  /**
   * Enable hover trigger
   * @default true
   */
  enableHover?: boolean
}

export function GlitchImage({
  src,
  alt,
  className,
  autoTriggerDelay = 30000, // 30 seconds
  glitchDuration = 2000, // 2 seconds
  glitchIntensity = 7,
  enableHover = true,
}: GlitchImageProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false)

  // Trigger glitch effect
  const triggerGlitch = useCallback(() => {
    if (!isGlitching) {
      setIsGlitching(true)
      setTimeout(() => {
        setIsGlitching(false)
      }, glitchDuration)
    }
  }, [isGlitching, glitchDuration])

  // Auto-trigger after delay (one time only)
  useEffect(() => {
    if (!hasAutoTriggered) {
      const timer = setTimeout(() => {
        triggerGlitch()
        setHasAutoTriggered(true)
      }, autoTriggerDelay)

      return () => clearTimeout(timer)
    }
  }, [autoTriggerDelay, triggerGlitch, hasAutoTriggered])

  // Handle hover
  const handleMouseEnter = () => {
    if (enableHover) {
      triggerGlitch()
    }
  }

  return (
    <div
      className={cn('relative w-full h-full cursor-pointer', className)}
      onMouseEnter={handleMouseEnter}
    >
      <FaultyTerminal
        active={isGlitching}
        intensity={glitchIntensity}
        duration={glitchDuration}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          priority
        />
      </FaultyTerminal>
    </div>
  )
}
