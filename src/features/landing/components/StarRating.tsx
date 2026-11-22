import { Star } from 'lucide-react'
import { REVIEWS_TEXT } from '../constants'

type StarRatingProps = {
  rating: number
}

const MAX_RATING = 5

export function StarRating({ rating }: StarRatingProps) {
  return (
    <p
      className="flex gap-0.5 text-rating"
      aria-label={REVIEWS_TEXT.ratingLabel(rating, MAX_RATING)}
    >
      {Array.from({ length: MAX_RATING }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className="size-4"
          fill={index < rating ? 'currentColor' : 'none'}
          strokeWidth={1.5}
        />
      ))}
    </p>
  )
}
