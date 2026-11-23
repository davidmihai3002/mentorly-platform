import { AppLink, RatingStars } from '@/components'
import { PROFILE_LINK_CLASS, PROFILE_TEXT } from '../constants'
import type { MentorProfile } from '../types'
import { formatScore } from '@/utils'
import { ProfileCard } from './ProfileCard'

type ReviewsCardProps = {
  rating: number
  reviewCount: number
  reviews: MentorProfile['reviews']
  reviewsPath: string
}

const MAX_SCORE = 5

export function ReviewsCard({ rating, reviewCount, reviews, reviewsPath }: ReviewsCardProps) {
  return (
    <ProfileCard
      title={PROFILE_TEXT.reviewsTitle}
      aside={
        <AppLink to={reviewsPath} className={PROFILE_LINK_CLASS}>
          {PROFILE_TEXT.allReviews} <span aria-hidden="true">→</span>
        </AppLink>
      }
    >
      <div className="grid gap-6 sm:grid-cols-[160px_minmax(0,1fr)]">
        <div className="flex flex-col gap-1.5">
          <p className="text-foreground">
            <span className="text-[44px] leading-none font-bold">{formatScore(rating)}</span>{' '}
            <span className="text-sm">{PROFILE_TEXT.ratingSuffix}</span>
          </p>
          <RatingStars
            rating={rating}
            label={`${formatScore(rating)} ${PROFILE_TEXT.ratingSuffix}`}
          />
          <p className="text-xs text-muted-foreground">{PROFILE_TEXT.reviewsCount(reviewCount)}</p>
        </div>
        <dl className="flex flex-col gap-3 text-[13px]">
          {reviews.criteria.map((criterion) => (
            <div
              key={criterion.label}
              className="grid grid-cols-[150px_minmax(0,1fr)_32px] items-center gap-3"
            >
              <dt className="text-foreground">{criterion.label}</dt>
              <dd className="contents">
                <span aria-hidden="true" className="h-1 overflow-hidden rounded-full bg-track">
                  <span
                    className="block h-full rounded-full bg-primary"
                    style={{ width: `${(criterion.score / MAX_SCORE) * 100}%` }}
                  />
                </span>
                <span className="text-right font-semibold text-foreground">
                  {formatScore(criterion.score)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      {reviews.items.length > 0 && (
        <ul className="grid gap-5 border-t border-border pt-4 md:grid-cols-2">
          {reviews.items.map((review) => (
            <li key={review.id}>
              <figure className="flex flex-col gap-2">
                <figcaption className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-foreground">
                  {review.author} <span aria-hidden="true">·</span>
                  <RatingStars
                    rating={review.rating}
                    label={`${review.rating} ${PROFILE_TEXT.ratingSuffix}`}
                    size="sm"
                  />
                  <span aria-hidden="true">·</span> {review.date}
                </figcaption>
                <blockquote className="text-[13px] leading-[1.5] text-foreground">
                  {review.quote}
                </blockquote>
              </figure>
            </li>
          ))}
        </ul>
      )}
    </ProfileCard>
  )
}
