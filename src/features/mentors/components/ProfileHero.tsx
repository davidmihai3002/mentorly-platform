import { RatingStars } from '@/components'
import { cn } from 'cn'
import { Handshake, UserRound } from 'lucide-react'
import { PROFILE_CARD_CLASS, PROFILE_TAG_CLASS, PROFILE_TEXT } from '../constants'
import type { MentorProfile } from '../types'
import { ExternalLinkItem } from './ExternalLinkItem'

type ProfileHeroProps = {
  profile: MentorProfile
}

export function ProfileHero({ profile }: ProfileHeroProps) {
  const { mentor } = profile
  const reviewCount = mentor.reputation?.reviewCount ?? 0
  const rating = mentor.rating.toLocaleString('ro-RO')

  return (
    <section className={cn(PROFILE_CARD_CLASS, 'flex flex-col gap-4 shadow-card-soft')}>
      <div className="flex flex-col gap-5 rounded-[14px] border border-border-soft bg-background/60 p-5 sm:flex-row sm:items-center">
        <span className="grid size-24 shrink-0 place-items-center rounded-full border-4 border-card bg-muted text-foreground/70 shadow-avatar">
          <UserRound aria-hidden="true" className="size-12 fill-current" />
        </span>
        <div className="flex min-w-0 flex-col gap-2">
          <ul className="flex flex-wrap gap-2">
            {profile.badges.map((badge) => (
              <li key={badge} className={cn(PROFILE_TAG_CLASS, 'uppercase')}>
                {badge}
              </li>
            ))}
          </ul>
          <h1 className="text-[clamp(1.75rem,4vw,2.125rem)] leading-[1.15] font-bold tracking-[-0.02em] text-foreground">
            {mentor.name}
          </h1>
          <p className="text-lg text-foreground">{mentor.role}</p>
          <p className="text-[13px] text-muted-foreground">{profile.meta}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <p className="flex items-center gap-2 text-sm">
          <RatingStars rating={mentor.rating} label={`${rating} ${PROFILE_TEXT.ratingSuffix}`} />
          <span className="font-semibold text-foreground">
            {rating} {PROFILE_TEXT.ratingSuffix}
          </span>
          <span className="text-muted-foreground">{PROFILE_TEXT.reviewCount(reviewCount)}</span>
        </p>
        {profile.links.length > 0 && (
          <ul className="flex flex-wrap gap-4">
            {profile.links.map((link) => (
              <li key={link.label}>
                <ExternalLinkItem link={link} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {profile.sponsorNote && (
        <p className="flex items-start gap-2.5 rounded-[12px] bg-selected p-3 text-xs leading-[1.5] text-link">
          <Handshake aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {profile.sponsorNote}
        </p>
      )}
    </section>
  )
}
