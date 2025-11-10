import { cn } from '@/lib/utils'

interface SectionLabelProps {
  number: string
  className?: string
}

export function SectionLabel({ number, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-block text-sm font-medium text-[#3354FF] mb-4',
        className
      )}
    >
      {number}
    </span>
  )
}
