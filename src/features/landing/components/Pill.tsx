import { cn } from 'cn'
import type { ReactNode } from 'react'

type PillProps = {
  children: ReactNode
  size: 'sm' | 'md'
  hasBorder?: boolean
  className?: string
}

const PILL_SIZE_CLASS = {
  sm: 'min-h-[22px] px-2.5 py-0.5 text-[10px]',
  md: 'min-h-[27px] px-3 py-1 text-[11px]',
} as const

export function Pill({ children, size, hasBorder = false, className }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex w-fit items-center rounded-full bg-selected text-foreground uppercase',
        PILL_SIZE_CLASS[size],
        hasBorder && 'border border-pill-border',
        className,
      )}
    >
      {children}
    </span>
  )
}
