import { cn } from 'cn'
import { useId } from 'react'
import { MENTOR_CARD_CLASS } from '@/constants'
import type { HeadingLevel, Mentor, MentorCardVariant } from '@/types'
import { MentorAvatar } from './MentorAvatar'
import { MentorCardActions } from './MentorCardActions'
import { MentorCardDetails } from './MentorCardDetails'
import { MentorIdentity } from './MentorIdentity'
import { MentorNameRole } from './MentorNameRole'

type MentorCardProps = {
  mentor: Mentor
  variant?: MentorCardVariant
  headingLevel?: HeadingLevel
  profileHref?: string
  onViewProfile?: () => void
  onApply?: () => void
}

export function MentorCard({
  mentor,
  variant = 'grid',
  headingLevel,
  profileHref,
  onViewProfile,
  onApply,
}: MentorCardProps) {
  const nameId = useId()
  const actions = (
    <MentorCardActions
      pricePerSession={mentor.pricePerSession}
      describedById={nameId}
      profileHref={profileHref}
      onViewProfile={onViewProfile}
      onApply={onApply}
    />
  )

  if (variant === 'list') {
    return (
      <article className={cn(MENTOR_CARD_CLASS, 'flex flex-col gap-4 sm:flex-row sm:items-start')}>
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <MentorAvatar />
          <div className="flex min-w-0 flex-col gap-3 pt-1">
            <MentorNameRole mentor={mentor} nameId={nameId} headingLevel={headingLevel} />
            <MentorCardDetails mentor={mentor} />
          </div>
        </div>
        <div className="sm:w-[180px] sm:text-right">{actions}</div>
      </article>
    )
  }

  return (
    <article className={cn(MENTOR_CARD_CLASS, 'flex flex-col gap-3')}>
      <MentorIdentity mentor={mentor} nameId={nameId} headingLevel={headingLevel} />
      <MentorCardDetails mentor={mentor} />
      {actions}
    </article>
  )
}
