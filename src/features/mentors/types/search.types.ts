import type { MentorLanguage } from '@/types'

export type DomainFilterId = 'it' | 'it-frontend' | 'react' | 'software'

export type AvailabilityFilterId = 'mon-thu' | 'mon' | 'thu' | 'weekend'

export type SortId = 'relevance' | 'price-asc' | 'rating'

export type ViewId = 'grid' | 'list'

export type MentorFilters = {
  readonly domain?: DomainFilterId
  readonly language?: MentorLanguage
  readonly maxPrice?: number
  readonly minRating?: number
  readonly availability?: AvailabilityFilterId
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
