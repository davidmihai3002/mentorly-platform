import { useSearchParams } from 'react-router'
import { MENTOR_DIRECTORY } from '@/constants'
import type { DirectoryMentor } from '@/types'
import type { FilterKey, MentorFilters, MentorSearch, SortId, ViewId } from '../types'
import { filterMentors, parseMentorSearch, toSearchParams, withoutFilter } from '../utils'

export type UseMentorSearchResult = {
  search: MentorSearch
  searchKey: string
  results: readonly DirectoryMentor[]
  total: number
  setQuery: (query: string) => void
  applyFilters: (filters: MentorFilters) => void
  resetFilters: () => void
  removeFilter: (key: FilterKey) => void
  setSort: (sort: SortId) => void
  setView: (view: ViewId) => void
}

export function useMentorSearch(): UseMentorSearchResult {
  const [params, setParams] = useSearchParams()
  const search = parseMentorSearch(params)

  function update(next: Partial<MentorSearch>) {
    setParams(toSearchParams({ ...search, ...next }), { preventScrollReset: true })
  }

  return {
    search,
    searchKey: params.toString(),
    results: filterMentors(MENTOR_DIRECTORY, search.query, search.filters, search.sort),
    total: MENTOR_DIRECTORY.length,
    setQuery: (query) => update({ query: query.trim() }),
    applyFilters: (filters) => update({ filters }),
    resetFilters: () => update({ filters: {} }),
    removeFilter: (key) => update({ filters: withoutFilter(search.filters, key) }),
    setSort: (sort) => update({ sort }),
    setView: (view) => update({ view }),
  }
}
