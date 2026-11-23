import { cn } from 'cn'
import { useId, type ReactNode } from 'react'
import { PROFILE_CARD_CLASS } from '../constants'

type ProfileCardProps = {
  title: string
  subtitle?: string
  aside?: ReactNode
  children: ReactNode
  className?: string
  id?: string
}

export function ProfileCard({ title, subtitle, aside, children, className, id }: ProfileCardProps) {
  const titleId = useId()

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn(PROFILE_CARD_CLASS, 'flex flex-col gap-4', className)}
    >
      <header className="flex flex-col gap-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h2
            id={titleId}
            className="text-[22px] leading-[1.25] font-bold tracking-[-0.02em] text-foreground"
          >
            {title}
          </h2>
          {aside}
        </div>
        {subtitle && <p className="text-[13px] text-muted-foreground">{subtitle}</p>}
      </header>
      {children}
    </section>
  )
}
