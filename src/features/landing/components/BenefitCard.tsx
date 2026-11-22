import { cn } from 'cn'
import { useId } from 'react'
import { LANDING_CARD_CLASS } from '../constants'
import { formatPosition } from '../utils'
import type { Benefit } from '../types'
import { ArrowLink } from './ArrowLink'

type BenefitCardProps = {
  benefit: Benefit
  position: number
}

export function BenefitCard({ benefit, position }: BenefitCardProps) {
  const titleId = useId()
  const Icon = benefit.icon

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        LANDING_CARD_CLASS,
        'relative flex min-h-[240px] flex-col border-border p-6 shadow-benefit transition-[box-shadow,border-color] duration-(--motion-duration) ease-(--motion-ease) focus-within:border-link focus-within:shadow-card-wide focus-within:ring-[0.6px] focus-within:ring-link hover:border-link hover:shadow-card-wide hover:ring-[0.6px] hover:ring-link',
      )}
    >
      <span className="grid size-8 place-items-center rounded-[8px] border border-border-soft bg-selected text-link-muted">
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </span>
      <span aria-hidden="true" className="absolute top-6 right-6 text-[13px] font-bold text-link">
        {formatPosition(position)}
      </span>
      <h2 id={titleId} className="mt-7 text-lg leading-[1.25] font-semibold text-foreground">
        {benefit.title}
      </h2>
      <p className="mt-2 text-sm leading-[1.32] text-foreground">{benefit.text}</p>
      <div className="mt-auto pt-6">
        <ArrowLink link={benefit.link} describedBy={titleId} />
      </div>
    </article>
  )
}
