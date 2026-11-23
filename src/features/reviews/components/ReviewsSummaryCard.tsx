import { cn } from 'cn'
import { AppLink, RatingStars } from '@/components'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import { formatScore } from '@/utils'
import { CRITERIA, REVIEWS_PAGE_TEXT, SUMMARY_SCORES } from '../constants'

type ReviewsSummaryCardProps = {
  rating: number
  reviewCount: number
  writeReviewPath: string
}

export function ReviewsSummaryCard({
  rating,
  reviewCount,
  writeReviewPath,
}: ReviewsSummaryCardProps) {
  const ratingText = `${formatScore(rating)} ${REVIEWS_PAGE_TEXT.ratingSuffix}`

  return (
    <section className="grid gap-6 rounded-[16px] border border-border bg-card p-5 sm:grid-cols-[200px_minmax(0,1fr)] sm:p-6">
      <div className="flex flex-col gap-2">
        <p className="text-[32px] leading-none font-bold text-foreground">{ratingText}</p>
        <RatingStars rating={rating} label={ratingText} tone="blue" />
        <p className="text-xs text-muted-foreground">
          {REVIEWS_PAGE_TEXT.reviewCount(reviewCount)}
        </p>
        <AppLink
          to={writeReviewPath}
          className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, 'mt-1 w-fit text-sm')}
        >
          {REVIEWS_PAGE_TEXT.writeReview}
        </AppLink>
      </div>
      <dl className="flex flex-col gap-3 text-[13px]">
        {CRITERIA.map((criterion) => (
          <div key={criterion.id} className="flex justify-between gap-3">
            <dt className="text-foreground">{criterion.label}</dt>
            <dd className="font-semibold text-primary">
              {formatScore(SUMMARY_SCORES[criterion.id])}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
