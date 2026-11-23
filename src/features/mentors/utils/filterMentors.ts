import type { DirectoryMentor } from '@/types'
import { findDomain } from '@/utils'
import type { MentorFilters, SortId } from '../types'

function matchesQuery(mentor: DirectoryMentor, query: string): boolean {
  if (!query) return true
  const needle = query.toLocaleLowerCase('ro-RO')
  const haystack = [
    mentor.name,
    mentor.role,
    mentor.description,
    findDomain(mentor.domainId)?.label,
  ]
    .join(' ')
    .toLocaleLowerCase('ro-RO')
  return haystack.includes(needle)
}

function matchesFilters(mentor: DirectoryMentor, filters: MentorFilters): boolean {
  return (
    (!filters.domain || mentor.domainId === filters.domain) &&
    (!filters.language || mentor.languages.includes(filters.language)) &&
    (filters.maxPrice === undefined || mentor.pricePerSession <= filters.maxPrice) &&
    (filters.minRating === undefined || mentor.rating >= filters.minRating) &&
    (!filters.availability || mentor.availability === filters.availability)
  )
}

const SORTERS: Readonly<Record<SortId, (a: DirectoryMentor, b: DirectoryMentor) => number>> = {
  relevance: () => 0,
  'price-asc': (a, b) => a.pricePerSession - b.pricePerSession,
  rating: (a, b) => b.rating - a.rating,
}

export function filterMentors(
  mentors: readonly DirectoryMentor[],
  query: string,
  filters: MentorFilters,
  sort: SortId,
): readonly DirectoryMentor[] {
  return mentors
    .filter((mentor) => matchesQuery(mentor, query) && matchesFilters(mentor, filters))
    .toSorted(SORTERS[sort])
}
