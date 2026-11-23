import { Star } from 'lucide-react'
import { REVIEW_LIMITS } from '../constants'

type StarsDisplayProps = {
  rating: number
  label: string
}

export function StarsDisplay({ rating, label }: StarsDisplayProps) {
  return (
    <span role="img" aria-label={label} className="inline-flex gap-0.5 text-primary">
      {Array.from({ length: REVIEW_LIMITS.maxStars }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className="size-4"
          fill={index < Math.round(rating) ? 'currentColor' : 'none'}
          strokeWidth={1.5}
        />
      ))}
    </span>
  )
}
