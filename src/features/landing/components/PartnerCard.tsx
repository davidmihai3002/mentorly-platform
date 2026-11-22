import { cn } from 'cn'
import { useId } from 'react'
import { LANDING_CARD_CLASS } from '../constants'
import type { Partner } from '../types'
import { ArrowLink } from './ArrowLink'

type PartnerCardProps = {
  partner: Partner
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const nameId = useId()
  const Icon = partner.icon

  return (
    <article
      aria-labelledby={nameId}
      className={cn(LANDING_CARD_CLASS, 'flex w-full flex-col border-border p-5 shadow-benefit')}
    >
      <div className="flex items-center gap-2.5">
        <Icon aria-hidden="true" className="size-6 text-link-muted" strokeWidth={1.5} />
        <h2 id={nameId} className="text-[19px] leading-none font-bold text-foreground">
          {partner.name}
        </h2>
      </div>
      <p className="mt-4 text-[10px] leading-[1.45] font-bold text-link uppercase">
        {partner.type}
      </p>
      <p className="mt-3 text-[13px] leading-[1.45] text-foreground">{partner.text}</p>
      <div className="mt-auto pt-4">
        <p className="border-t border-border pt-4 text-[13px] leading-[1.45] text-muted-foreground">
          {partner.meta}
        </p>
        <div className="mt-3">
          <ArrowLink link={partner.link} describedBy={nameId} />
        </div>
      </div>
    </article>
  )
}
