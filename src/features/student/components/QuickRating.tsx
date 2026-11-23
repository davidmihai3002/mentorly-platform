import { cn } from 'cn'
import { useState } from 'react'
import { ChoiceDialog } from '@/components'
import { QUICK_RATING_MAX, STUDENT_PROFILE_TEXT } from '../constants'

const RATING_OPTIONS = Array.from({ length: QUICK_RATING_MAX }, (_, index) => {
  const stars = QUICK_RATING_MAX - index
  return {
    value: String(stars),
    label: STUDENT_PROFILE_TEXT.quickRatingOption(stars, QUICK_RATING_MAX),
  }
})

export function QuickRating() {
  const [rating, setRating] = useState<string>()

  return (
    <div className="flex flex-col gap-1">
      <ChoiceDialog
        title={STUDENT_PROFILE_TEXT.quickRatingTitle}
        options={RATING_OPTIONS}
        value={rating}
        cancelLabel={STUDENT_PROFILE_TEXT.quickRatingCancel}
        onChange={setRating}
        trigger={
          <button
            type="button"
            className="w-fit rounded-sm text-[11px] font-medium text-link hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
          >
            {STUDENT_PROFILE_TEXT.quickRating}
          </button>
        }
      />
      <p
        role="status"
        className={cn('text-[11px] font-medium text-success-foreground', !rating && 'sr-only')}
      >
        {rating ? STUDENT_PROFILE_TEXT.quickRatingDone(rating, QUICK_RATING_MAX) : ''}
      </p>
    </div>
  )
}
