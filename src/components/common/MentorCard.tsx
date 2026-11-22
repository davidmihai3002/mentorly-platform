import type { Mentor, MentorCardVariant } from '@/types'
import { MentorAvatar } from './MentorAvatar'
import { MentorCardActions } from './MentorCardActions'
import { MentorCardDetails } from './MentorCardDetails'
import { MentorIdentity } from './MentorIdentity'
import { MentorNameRole } from './MentorNameRole'

type MentorCardProps = {
  mentor: Mentor
  variant?: MentorCardVariant
  onViewProfile?: () => void
  onApply?: () => void
}

export function MentorCard({ mentor, variant = 'grid', onViewProfile, onApply }: MentorCardProps) {
  const actions = (
    <MentorCardActions
      pricePerSession={mentor.pricePerSession}
      onViewProfile={onViewProfile}
      onApply={onApply}
    />
  )

  if (variant === 'list') {
    return (
      <article className="flex flex-col gap-4 rounded-[14px] border border-border bg-card p-[18px] sm:flex-row sm:items-start">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <MentorAvatar />
          <div className="flex min-w-0 flex-col gap-3 pt-1">
            <MentorNameRole mentor={mentor} />
            <MentorCardDetails mentor={mentor} />
          </div>
        </div>
        <div className="sm:w-[180px] sm:text-right">{actions}</div>
      </article>
    )
  }

  return (
    <article className="flex flex-col gap-3 rounded-[14px] border border-border bg-card p-[18px]">
      <MentorIdentity mentor={mentor} />
      <MentorCardDetails mentor={mentor} />
      {actions}
    </article>
  )
}
