import type { DetailedReview, ReviewFilterId, ReviewSortId } from '../types'

const SORTERS: Readonly<Record<ReviewSortId, (a: DetailedReview, b: DetailedReview) => number>> = {
  recent: (a, b) => b.sortKey - a.sortKey,
  helpful: (a, b) => b.helpfulCount - a.helpfulCount,
}

export function selectReviews(
  reviews: readonly DetailedReview[],
  filter: ReviewFilterId,
  sort: ReviewSortId,
): readonly DetailedReview[] {
  return reviews
    .filter((review) => filter === 'all' || review.rating === Number(filter))
    .toSorted(SORTERS[sort])
}

export function countByRating(reviews: readonly DetailedReview[], rating: number): number {
  return reviews.filter((review) => review.rating === rating).length
}
