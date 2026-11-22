import { cn } from 'cn'
import { LANDING_CARD_CLASS, REVIEWS_TEXT } from '../constants'
import { formatPosition } from '../utils'
import type { Review } from '../types'
import { PersonAvatar } from './PersonAvatar'
import { StarRating } from './StarRating'

type ReviewCardProps = {
  review: Review
  position: number
}

export function ReviewCard({ review, position }: ReviewCardProps) {
  return (
    <figure
      className={cn(
        LANDING_CARD_CLASS,
        'relative flex min-h-[202px] w-full flex-col border-border-soft px-[22px] pt-[22px] pb-5 shadow-review',
      )}
    >
      <div className="flex items-start justify-between">
        <StarRating rating={review.rating} />
        <span aria-hidden="true" className="font-serif text-[28px] leading-none text-link-muted/60">
          “
        </span>
      </div>
      <blockquote className="mt-4 text-[13px] leading-[1.43] text-foreground">
        <p>{review.quote}</p>
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-2.5 pt-4">
        <PersonAvatar person={review.author} />
        <span className="min-w-0">
          <span className="block text-[11px] leading-[1.25] font-medium text-foreground">
            {review.author.name}
          </span>
          <span className="block text-[9px] leading-[1.4] text-muted-foreground">
            {review.role} · {REVIEWS_TEXT.withMentor} {review.mentorName}
          </span>
        </span>
      </figcaption>
      <span
        aria-hidden="true"
        className="absolute right-5 bottom-5 text-[9px] text-muted-foreground"
      >
        {formatPosition(position)}
      </span>
    </figure>
  )
}
