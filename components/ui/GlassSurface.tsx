import React from 'react'
import { cn } from '@/lib/utils'

export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The blur intensity for the backdrop filter
   * @default 'md'
   */
  blur?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * The opacity of the background
   * @default 10
   */
  opacity?: number
  /**
   * Whether to show a border
   * @default true
   */
  border?: boolean
  /**
   * Border color with opacity
   * @default 'white/20'
   */
  borderColor?: string
  /**
   * Whether to add a subtle shadow
   * @default true
   */
  shadow?: boolean
}

const blurMap = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl',
}

export const GlassSurface = React.forwardRef<HTMLDivElement, GlassSurfaceProps>(
  (
    {
      children,
      className,
      blur = 'md',
      opacity = 10,
      border = true,
      borderColor = 'rgba(255, 255, 255, 0.2)',
      shadow = true,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'relative',
          // Blur effect
          blurMap[blur],
          // Border
          border && 'border',
          // Shadow
          shadow && 'shadow-xl',
          className
        )}
        style={{
          backgroundColor: `rgba(255, 255, 255, ${opacity / 100})`,
          borderColor: border ? borderColor : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GlassSurface.displayName = 'GlassSurface'
