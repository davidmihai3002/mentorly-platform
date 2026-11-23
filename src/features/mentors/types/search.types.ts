import type { AvailabilityId, DomainId, MentorLanguage } from '@/types'

export type SortId = 'relevance' | 'price-asc' | 'rating'

export type ViewId = 'grid' | 'list'

export type MentorFilters = {
  readonly domain?: DomainId
  readonly language?: MentorLanguage
  readonly maxPrice?: number
  readonly minRating?: number
  readonly availability?: AvailabilityId
}

export type FilterKey = keyof MentorFilters

export type MentorSearch = {
  readonly query: string
  readonly filters: MentorFilters
  readonly sort: SortId
  readonly view: ViewId
}

export type SelectOption = {
  readonly value: string
  readonly label: string
}

export type ActiveFilter = {
  readonly key: FilterKey
  readonly label: string
}
