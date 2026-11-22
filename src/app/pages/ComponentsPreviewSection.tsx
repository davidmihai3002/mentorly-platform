import type { ReactNode } from 'react'

type ComponentsPreviewSectionProps = {
  title: string
  children: ReactNode
}

export function ComponentsPreviewSection({ title, children }: ComponentsPreviewSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">{title}</h2>
      {children}
    </section>
  )
}
