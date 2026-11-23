import { cn } from 'cn'
import { useState } from 'react'
import { generatePath, useLocation, useParams } from 'react-router'
import { MENTOR_DIRECTORY, ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, ROUTES } from '@/constants'
import { REVIEW_LIMITS, REVIEWS_PAGE_TEXT, SAMPLE_REVIEWS } from '../constants'
import type { ReviewFilterId, ReviewSortId } from '../types'
import { countByRating, selectReviews } from '../utils'
import { ReviewFilters } from './ReviewFilters'
import { ReviewItem } from './ReviewItem'
import { ReviewPageHeader } from './ReviewPageHeader'
import { ReviewsSummaryCard } from './ReviewsSummaryCard'
import { ReviewsUnavailable } from './ReviewsUnavailable'

export function MentorReviewsPage() {
  const { mentorId } = useParams()
  const { state } = useLocation()
  const [filter, setFilter] = useState<ReviewFilterId>('all')
  const [sort, setSort] = useState<ReviewSortId>('recent')
  const [visibleCount, setVisibleCount] = useState<number>(REVIEW_LIMITS.pageSize)
  const mentor = MENTOR_DIRECTORY.find((candidate) => candidate.id === mentorId)

  if (!mentor) return <ReviewsUnavailable />

  const firstName = mentor.name.split(' ')[0] ?? mentor.name
  const reviews = selectReviews(SAMPLE_REVIEWS, filter, sort)
  const visible = reviews.slice(0, visibleCount)
  const isPublished = typeof state === 'object' && state !== null && 'published' in state

  function changeFilter(next: ReviewFilterId) {
    setFilter(next)
    setVisibleCount(REVIEW_LIMITS.pageSize)
  }

  return (
    <div className="flex flex-col gap-5">
      <title>{REVIEWS_PAGE_TEXT.pageTitle(mentor.name)}</title>
      <ReviewPageHeader
        title={REVIEWS_PAGE_TEXT.title(firstName)}
        subtitle={REVIEWS_PAGE_TEXT.subtitle}
      />
      {isPublished && (
        <p
          role="status"
          className="rounded-[12px] bg-success px-4 py-3 text-sm font-medium text-success-foreground"
        >
          {REVIEWS_PAGE_TEXT.published}
        </p>
      )}
      <ReviewsSummaryCard
        rating={mentor.rating}
        reviewCount={mentor.reputation?.reviewCount ?? SAMPLE_REVIEWS.length}
        writeReviewPath={generatePath(ROUTES.writeReview, { mentorId: mentor.id })}
      />
      <ReviewFilters
        filter={filter}
        sort={sort}
        counts={{
          all: mentor.reputation?.reviewCount ?? SAMPLE_REVIEWS.length,
          '5': countByRating(SAMPLE_REVIEWS, 5),
          '4': countByRating(SAMPLE_REVIEWS, 4),
        }}
        onFilterChange={changeFilter}
        onSortChange={setSort}
      />
      <p role="status" className="sr-only">
        {REVIEWS_PAGE_TEXT.shown(visible.length, reviews.length)}
      </p>
      {visible.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {visible.map((review) => (
            <li key={review.id}>
              <ReviewItem review={review} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">{REVIEWS_PAGE_TEXT.empty}</p>
      )}
      {visible.length < reviews.length && (
        <button
          type="button"
          onClick={() => setVisibleCount((count) => count + REVIEW_LIMITS.pageSize)}
          className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'text-sm')}
        >
          {REVIEWS_PAGE_TEXT.loadMore}
        </button>
      )}
    </div>
  )
}
