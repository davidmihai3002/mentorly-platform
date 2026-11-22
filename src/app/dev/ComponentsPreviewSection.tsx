import { cn } from 'cn'
import type { ReactNode } from 'react'

type ComponentsPreviewSectionProps = {
  title: string
  variant?: 'panel' | 'dashed' | 'plain'
  children: ReactNode
}

const SECTION_VARIANT_CLASS = {
  panel: 'rounded-2xl border border-border bg-card p-6 shadow-sm',
  dashed: 'rounded-2xl border border-dashed border-border p-4',
  plain: '',
} as const

export function ComponentsPreviewSection({
  title,
  variant = 'plain',
  children,
}: ComponentsPreviewSectionProps) {
  const isPanel = variant === 'panel'

  return (
    <section className="space-y-4">
      {!isPanel && <h2 className="text-xl font-bold text-foreground">{title}</h2>}
      <div className={cn('space-y-4', SECTION_VARIANT_CLASS[variant])}>
        {isPanel && <h2 className="text-xl font-bold text-foreground">{title}</h2>}
        {children}
      </div>
    </section>
  )
}
