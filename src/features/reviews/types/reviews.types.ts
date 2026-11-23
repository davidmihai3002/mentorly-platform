export type CriterionId = 'clarity' | 'empathy' | 'structure' | 'usefulness'

export type DetailedReview = {
  readonly id: string
  readonly author: string
  readonly date: string
  readonly sortKey: number
  readonly rating: number
  readonly text: string
  readonly scores: Readonly<Record<CriterionId, number>>
  readonly helpfulCount: number
}

export type ReviewFilterId = 'all' | '5' | '4'

export type ReviewSortId = 'recent' | 'helpful'

export type PublishedState = {
  readonly published: true
}
