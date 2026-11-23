import { MENTOR_SCHEDULES } from '@/constants'
import type { DirectoryMentor } from '@/types'
import { findDomain } from '@/utils'
import { AVAILABILITY_WEEKDAYS, DOMAIN_FILTER_LABELS } from '../constants'
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

function matchesDomain(mentor: DirectoryMentor, domain: MentorFilters['domain']): boolean {
  if (!domain) return true
  if (domain === 'it' || domain === 'it-frontend') return mentor.domainId === 'it-frontend'
  return mentor.domainLabel === DOMAIN_FILTER_LABELS[domain]
}

function matchesAvailability(
  mentor: DirectoryMentor,
  availability: MentorFilters['availability'],
): boolean {
  if (!availability) return true
  const weekdays = AVAILABILITY_WEEKDAYS[availability] ?? []
  return MENTOR_SCHEDULES[mentor.availability].some((slot) => weekdays.includes(slot.weekday))
}

function matchesFilters(mentor: DirectoryMentor, filters: MentorFilters): boolean {
  return (
    matchesDomain(mentor, filters.domain) &&
    (!filters.language || mentor.languages.includes(filters.language)) &&
    (filters.maxPrice === undefined || mentor.pricePerSession <= filters.maxPrice) &&
    (filters.minRating === undefined || mentor.rating >= filters.minRating) &&
    matchesAvailability(mentor, filters.availability)
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
