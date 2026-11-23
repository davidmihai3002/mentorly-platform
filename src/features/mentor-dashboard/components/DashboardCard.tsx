import { cn } from 'cn'
import { useId, type ReactNode } from 'react'

type DashboardCardProps = {
  title: string
  id?: string
  children: ReactNode
  className?: string
}

export function DashboardCard({ title, id, children, className }: DashboardCardProps) {
  const titleId = useId()

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn(
        'flex scroll-mt-24 flex-col gap-4 rounded-[16px] border border-border bg-card p-5',
        className,
      )}
    >
      <h2 id={titleId} className="text-xl font-bold tracking-[-0.02em] text-foreground">
        {title}
      </h2>
      {children}
    </section>
  )
}
