import { cn } from 'cn'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import { PROFILE_TAG_CLASS, PROFILE_TEXT } from '../constants'
import type { MentorProfile } from '../types'
import { ProfileCard } from './ProfileCard'

type PricingCardProps = {
  sessionPrice: number
  pricing: MentorProfile['pricing']
  applyAnchor: string
}

export function PricingCard({ sessionPrice, pricing, applyAnchor }: PricingCardProps) {
  return (
    <ProfileCard title={PROFILE_TEXT.pricingTitle} className="shadow-card-soft">
      <div className="flex flex-col gap-1 border-b border-border pb-4">
        <p className="text-foreground">
          <span className="text-[28px] font-bold tracking-[-0.02em]">{sessionPrice} lei</span>{' '}
          <span className="text-[13px]">{PROFILE_TEXT.perSession}</span>
        </p>
        <p className="text-xs text-muted-foreground">{PROFILE_TEXT.sessionMeta}</p>
      </div>
      <div className="flex flex-col gap-2">
        <span className={cn(PROFILE_TAG_CLASS, 'w-fit uppercase')}>
          {PROFILE_TEXT.monthlyBadge}
        </span>
        <p className="text-foreground">
          <span className="text-[28px] font-bold tracking-[-0.02em]">
            {pricing.monthlyPrice} lei
          </span>{' '}
          <span className="text-[13px]">{PROFILE_TEXT.perMonth}</span>
        </p>
        <p className="text-[13px] text-foreground">{pricing.monthlyMeta}</p>
        <p className="text-xs text-link">{pricing.discountNote}</p>
      </div>
      <a href={`#${applyAnchor}`} className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}>
        {PROFILE_TEXT.apply}
      </a>
      <p className="text-xs text-muted-foreground">{PROFILE_TEXT.pricingNote}</p>
    </ProfileCard>
  )
}
