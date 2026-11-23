import { cn } from 'cn'
import { Star } from 'lucide-react'

type RatingStarsProps = {
  rating: number
  label: string
  tone?: 'gold' | 'blue'
  size?: 'sm' | 'md'
}

const MAX_STARS = 5

export function RatingStars({ rating, label, tone = 'gold', size = 'md' }: RatingStarsProps) {
  return (
    <span
      role="img"
      aria-label={label}
      className={cn('inline-flex gap-0.5', tone === 'gold' ? 'text-rating' : 'text-primary')}
    >
      {Array.from({ length: MAX_STARS }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(size === 'sm' ? 'size-3' : 'size-4', tone === 'gold' && 'stroke-amber-600')}
          fill={index < Math.round(rating) ? 'currentColor' : 'none'}
          strokeWidth={1.5}
        />
      ))}
    </span>
  )
}
