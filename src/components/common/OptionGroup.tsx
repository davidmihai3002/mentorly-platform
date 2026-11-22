import { cn } from 'cn'
import type { ReactNode } from 'react'

type OptionGroupProps = {
  legend: string
  isLegendHidden?: boolean
  children: ReactNode
}

export function OptionGroup({ legend, isLegendHidden = false, children }: OptionGroupProps) {
  return (
    <fieldset className="space-y-3">
      <legend
        className={cn('mb-3 text-sm font-semibold text-foreground', isLegendHidden && 'sr-only')}
      >
        {legend}
      </legend>
      {children}
    </fieldset>
  )
}
