import { cn } from 'cn'
import { Star } from 'lucide-react'
import { useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { REVIEW_LIMITS, WRITE_REVIEW_TEXT } from '../constants'

type StarRatingInputProps = {
  legend: string
  value: number
  registration: UseFormRegisterReturn
  error?: string
  size?: 'sm' | 'lg'
  isLegendVisible?: boolean
  summary?: string
}

const STAR_VALUES = Array.from({ length: REVIEW_LIMITS.maxStars }, (_, index) => index + 1)

export function StarRatingInput({
  legend,
  value,
  registration,
  error,
  size = 'sm',
  isLegendVisible = true,
  summary,
}: StarRatingInputProps) {
  const errorId = useId()

  return (
    <fieldset aria-describedby={error ? errorId : undefined} className="flex flex-col gap-2">
      <legend className={cn('text-[13px] text-foreground', !isLegendVisible && 'sr-only')}>
        {legend}
      </legend>
      <div className="-mx-1 flex">
        {STAR_VALUES.map((star) => (
          <label
            key={star}
            className="cursor-pointer rounded-sm p-1 has-focus-visible:ring-3 has-focus-visible:ring-ring"
          >
            <input
              type="radio"
              value={star}
              checked={value === star}
              aria-label={WRITE_REVIEW_TEXT.starLabel(star)}
              aria-invalid={Boolean(error) || undefined}
              className="sr-only"
              {...registration}
            />
            <Star
              aria-hidden="true"
              className={cn(
                'text-primary transition-transform hover:scale-110',
                size === 'lg' ? 'size-8' : 'size-4',
              )}
              fill={star <= value ? 'currentColor' : 'none'}
              strokeWidth={1.5}
            />
          </label>
        ))}
      </div>
      {summary && <p className="text-xs font-medium text-link">{summary}</p>}
      {error && (
        <p id={errorId} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </fieldset>
  )
}
