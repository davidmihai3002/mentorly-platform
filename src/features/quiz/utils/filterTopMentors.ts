import { DOMAIN_FILTERS } from '../constants'
import type { DomainFilterId, QuizMentor } from '../types'

export function filterTopMentors(
  mentors: readonly QuizMentor[],
  filterId: DomainFilterId,
): readonly QuizMentor[] {
  const domains = DOMAIN_FILTERS.find((filter) => filter.id === filterId)?.domains ?? []
  return mentors
    .filter((mentor) => mentor.topLabel || domains.length > 0)
    .filter((mentor) => domains.length === 0 || domains.includes(mentor.domainId))
    .map((mentor) => ({ ...mentor, highlight: mentor.topLabel ?? mentor.focusLabel }))
}
