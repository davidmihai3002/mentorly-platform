import type { AvailabilityId, DomainId, MentorLanguage } from '@/types'
import { FILTER_OPTIONS, SEARCH_PARAM_KEYS, SORT_OPTIONS } from '../constants'
import type { FilterKey, MentorFilters, MentorSearch, ViewId } from '../types'

const MAX_QUERY_LENGTH = 80
const VIEWS: readonly ViewId[] = ['grid', 'list']

function readOption(params: URLSearchParams, key: FilterKey): string | undefined {
  const raw = params.get(SEARCH_PARAM_KEYS[key])
  return FILTER_OPTIONS[key].some((option) => option.value === raw) ? (raw ?? undefined) : undefined
}

function readNumber(params: URLSearchParams, key: FilterKey): number | undefined {
  const value = readOption(params, key)
  return value === undefined ? undefined : Number(value)
}

export function parseMentorSearch(params: URLSearchParams): MentorSearch {
  const sort = params.get(SEARCH_PARAM_KEYS.sort)
  const view = params.get(SEARCH_PARAM_KEYS.view)
  return {
    query: (params.get(SEARCH_PARAM_KEYS.query) ?? '').trim().slice(0, MAX_QUERY_LENGTH),
    filters: {
      domain: readOption(params, 'domain') as DomainId | undefined,
      language: readOption(params, 'language') as MentorLanguage | undefined,
      maxPrice: readNumber(params, 'maxPrice'),
      minRating: readNumber(params, 'minRating'),
      availability: readOption(params, 'availability') as AvailabilityId | undefined,
    },
    sort: SORT_OPTIONS.find((option) => option.value === sort)?.value ?? 'relevance',
    view: VIEWS.find((candidate) => candidate === view) ?? 'grid',
  }
}

export function toSearchParams(search: MentorSearch): URLSearchParams {
  const values: Record<string, string | number | undefined> = {
    [SEARCH_PARAM_KEYS.query]: search.query || undefined,
    [SEARCH_PARAM_KEYS.domain]: search.filters.domain,
    [SEARCH_PARAM_KEYS.language]: search.filters.language,
    [SEARCH_PARAM_KEYS.maxPrice]: search.filters.maxPrice,
    [SEARCH_PARAM_KEYS.minRating]: search.filters.minRating,
    [SEARCH_PARAM_KEYS.availability]: search.filters.availability,
    [SEARCH_PARAM_KEYS.sort]: search.sort === 'relevance' ? undefined : search.sort,
    [SEARCH_PARAM_KEYS.view]: search.view === 'grid' ? undefined : search.view,
  }
  const entries = Object.entries(values).flatMap(([key, value]) =>
    value === undefined ? [] : [[key, String(value)]],
  )
  return new URLSearchParams(entries)
}

export function withoutFilter(filters: MentorFilters, key: FilterKey): MentorFilters {
  return { ...filters, [key]: undefined }
}
