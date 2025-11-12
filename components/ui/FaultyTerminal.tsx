'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface FaultyTerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the glitch effect is active
   */
  active?: boolean
  /**
   * Intensity of the glitch (1-10)
   * @default 5
   */
  intensity?: number
  /**
   * Duration of the glitch effect in milliseconds
   * @default 2000
   */
  duration?: number
}

export const FaultyTerminal = React.forwardRef<HTMLDivElement, FaultyTerminalProps>(
  ({ children, className, active = false, intensity = 5, duration = 2000, ...props }, ref) => {
    const [glitchActive, setGlitchActive] = useState(false)

    useEffect(() => {
      if (active) {
        setGlitchActive(true)
        const timer = setTimeout(() => {
          setGlitchActive(false)
        }, duration)
        return () => clearTimeout(timer)
      } else {
        setGlitchActive(false)
      }
    }, [active, duration])

    return (
      <div
        ref={ref}
        className={cn('relative w-full h-full', className)}
        {...props}
      >
        <div
          className={cn(
            'relative w-full h-full transition-all duration-300',
            glitchActive && 'animate-glitch'
          )}
          style={{
            animation: glitchActive
              ? `glitch ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
              : 'none',
          }}
        >
          {children}
        </div>

        {/* Glitch overlay layers */}
        {glitchActive && (
          <>
            {/* Opaque background overlay */}
            <div
              className="absolute inset-0 pointer-events-none bg-black"
              style={{
                animation: `flicker ${duration}ms ease-in-out`,
                opacity: 0.3,
              }}
            />

            <div
              className="absolute inset-0 pointer-events-none opacity-95"
              style={{
                animation: `glitch-1 ${duration}ms infinite`,
                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                transform: 'translate(-2px, -2px)',
                filter: 'hue-rotate(90deg)',
              }}
            >
              {children}
            </div>
            <div
              className="absolute inset-0 pointer-events-none opacity-95"
              style={{
                animation: `glitch-2 ${duration}ms infinite`,
                clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                transform: 'translate(2px, 2px)',
                filter: 'hue-rotate(-90deg)',
              }}
            >
              {children}
            </div>
            {/* Scanlines effect - smaller pixels */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                background:
                  'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) 0.5px, transparent 0.5px, transparent 1px)',
                animation: `scanlines ${duration / 2}ms linear infinite`,
              }}
            />
            {/* Pixel grid effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 0.3) 1px, rgba(0, 0, 0, 0.3) 2px),
                  repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(0, 0, 0, 0.3) 1px, rgba(0, 0, 0, 0.3) 2px)
                `,
                backgroundSize: '2px 2px',
              }}
            />
            {/* RGB split effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                animation: `rgb-split ${duration / 4}ms infinite`,
                mixBlendMode: 'screen',
              }}
            >
              <div className="absolute inset-0 bg-red-500/40 translate-x-[2px]" />
              <div className="absolute inset-0 bg-blue-500/40 -translate-x-[2px]" />
              <div className="absolute inset-0 bg-green-500/30" />
            </div>
          </>
        )}

        <style jsx>{`
          @keyframes glitch {
            0%,
            100% {
              transform: translate(0);
            }
            20% {
              transform: translate(-2px, 2px);
            }
            40% {
              transform: translate(-2px, -2px);
            }
            60% {
              transform: translate(2px, 2px);
            }
            80% {
              transform: translate(2px, -2px);
            }
          }

          @keyframes glitch-1 {
            0%,
            100% {
              transform: translate(0);
              opacity: 0.8;
            }
            25% {
              transform: translate(-5px, 0);
              opacity: 0.9;
            }
            50% {
              transform: translate(5px, 0);
              opacity: 0.7;
            }
            75% {
              transform: translate(-3px, 0);
              opacity: 0.85;
            }
          }

          @keyframes glitch-2 {
            0%,
            100% {
              transform: translate(0);
              opacity: 0.8;
            }
            25% {
              transform: translate(3px, 0);
              opacity: 0.9;
            }
            50% {
              transform: translate(-5px, 0);
              opacity: 0.7;
            }
            75% {
              transform: translate(4px, 0);
              opacity: 0.85;
            }
          }

          @keyframes scanlines {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(10px);
            }
          }

          @keyframes rgb-split {
            0%,
            100% {
              transform: translate(0);
            }
            33% {
              transform: translate(2px, -1px);
            }
            66% {
              transform: translate(-2px, 1px);
            }
          }

          @keyframes flicker {
            0%, 100% {
              opacity: 0.3;
            }
            10%, 30%, 50%, 70%, 90% {
              opacity: 0.1;
            }
            20%, 40%, 60%, 80% {
              opacity: 0.4;
            }
          }
        `}</style>
      </div>
    )
  }
)

FaultyTerminal.displayName = 'FaultyTerminal'
