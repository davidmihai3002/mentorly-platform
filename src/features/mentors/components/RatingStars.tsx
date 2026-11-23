import { Star } from 'lucide-react'

type RatingStarsProps = {
  rating: number
  label: string
  size?: 'sm' | 'md'
}

const MAX_STARS = 5

export function RatingStars({ rating, label, size = 'md' }: RatingStarsProps) {
  return (
    <span role="img" aria-label={label} className="inline-flex gap-0.5 text-rating">
      {Array.from({ length: MAX_STARS }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={size === 'sm' ? 'size-3 stroke-amber-600' : 'size-4 stroke-amber-600'}
          fill={index < Math.round(rating) ? 'currentColor' : 'none'}
          strokeWidth={1.5}
        />
      ))}
    </span>
  )
}
