import { cn } from 'cn'
import { AppLink } from '@/components/navigation'
import { buttonVariants } from '@/components/ui'
import { MENTOR_TEXT, PILL_PRIMARY_CLASS } from '@/constants'
import { formatSessionPrice } from '@/utils'

type MentorCardActionsProps = {
  pricePerSession: number
  describedById?: string
  profileHref?: string
  onViewProfile?: () => void
  onApply?: () => void
}

const VIEW_PROFILE_CLASS = cn(buttonVariants(), PILL_PRIMARY_CLASS, 'w-full')

export function MentorCardActions({
  pricePerSession,
  describedById,
  profileHref,
  onViewProfile,
  onApply,
}: MentorCardActionsProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-base leading-[1.45] font-bold tracking-[-0.02em] text-foreground">
        {formatSessionPrice(pricePerSession)}
      </p>
      {profileHref ? (
        <AppLink to={profileHref} aria-describedby={describedById} className={VIEW_PROFILE_CLASS}>
          {MENTOR_TEXT.viewProfile}
        </AppLink>
      ) : (
        <button
          type="button"
          aria-describedby={describedById}
          onClick={onViewProfile}
          className={VIEW_PROFILE_CLASS}
        >
          {MENTOR_TEXT.viewProfile}
        </button>
      )}
      <button
        type="button"
        aria-describedby={describedById}
        onClick={onApply}
        className="rounded-sm text-center text-xs font-medium tracking-[-0.02em] text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
      >
        {MENTOR_TEXT.apply} <span aria-hidden="true">{MENTOR_TEXT.applyArrow}</span>
      </button>
    </div>
  )
}
