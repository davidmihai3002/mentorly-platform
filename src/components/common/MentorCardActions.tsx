import { cn } from 'cn'
import { buttonVariants } from '@/components/ui'
import { MENTOR_TEXT, PILL_PRIMARY_CLASS } from '@/constants'
import { formatSessionPrice } from '@/utils'

type MentorCardActionsProps = {
  pricePerSession: number
  onViewProfile?: () => void
  onApply?: () => void
}

export function MentorCardActions({
  pricePerSession,
  onViewProfile,
  onApply,
}: MentorCardActionsProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-base leading-[1.45] font-bold tracking-[-0.02em] text-foreground">
        {formatSessionPrice(pricePerSession)}
      </p>
      <button
        type="button"
        onClick={onViewProfile}
        className={cn(buttonVariants(), PILL_PRIMARY_CLASS, 'w-full')}
      >
        {MENTOR_TEXT.viewProfile}
      </button>
      <button
        type="button"
        onClick={onApply}
        className="rounded-sm text-center text-xs font-medium tracking-[-0.02em] text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        {MENTOR_TEXT.apply}
      </button>
    </div>
  )
}
