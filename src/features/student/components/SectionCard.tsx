import { cn } from 'cn'
import { useId, type ReactNode } from 'react'

type SectionCardProps = {
  title: string
  aside?: ReactNode
  children: ReactNode
  className?: string
}

export function SectionCard({ title, aside, children, className }: SectionCardProps) {
  const titleId = useId()

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        'flex flex-col gap-3 rounded-[16px] border border-border bg-card p-5',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id={titleId} className="text-xl font-bold tracking-[-0.02em] text-foreground">
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  )
}
