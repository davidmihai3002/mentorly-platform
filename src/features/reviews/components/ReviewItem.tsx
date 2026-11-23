import { RatingStars } from '@/components'
import { useId, useState } from 'react'
import { CRITERIA, REVIEW_LIMITS, REVIEWS_PAGE_TEXT } from '../constants'
import type { DetailedReview } from '../types'

type ReviewItemProps = {
  review: DetailedReview
}

export function ReviewItem({ review }: ReviewItemProps) {
  const titleId = useId()
  const [isHelpful, setIsHelpful] = useState(false)
  const ratingText = `${review.rating} / ${REVIEW_LIMITS.maxStars}`

  return (
    <article
      aria-labelledby={titleId}
      className="flex flex-col gap-3 rounded-[16px] border border-border bg-card p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id={titleId} className="text-sm font-bold text-foreground">
          {review.author} · {review.date}
        </h2>
        <span className="rounded-[12px] bg-tag px-2.5 py-1 text-[10px] uppercase">
          {REVIEWS_PAGE_TEXT.finished}
        </span>
      </div>
      <p className="flex items-center gap-1.5 text-primary">
        <RatingStars rating={review.rating} label={ratingText} tone="blue" />
        <span aria-hidden="true" className="text-sm">
          · {ratingText}
        </span>
      </p>
      <p className="text-sm leading-[1.5] text-foreground">{review.text}</p>
      <p className="text-[11px] text-link">
        {CRITERIA.map((criterion) => `${criterion.short} ${review.scores[criterion.id]}/5`).join(
          ' · ',
        )}
      </p>
      <p className="flex flex-wrap items-center gap-1 text-[11px] text-muted-foreground">
        {REVIEWS_PAGE_TEXT.meta} ·
        <button
          type="button"
          aria-pressed={isHelpful}
          onClick={() => setIsHelpful((current) => !current)}
          className="min-h-6 rounded-sm hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none aria-pressed:font-semibold aria-pressed:text-primary"
        >
          {REVIEWS_PAGE_TEXT.helpful(review.helpfulCount + (isHelpful ? 1 : 0))}
        </button>
      </p>
    </article>
  )
}
