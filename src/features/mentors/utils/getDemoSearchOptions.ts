import { MENTOR_DIRECTORY } from '@/constants'
import { ANY_VALUE, DEMO_SEARCH_ALL_LABEL, DEMO_SEARCH_LIMIT } from '../constants'
import type { SelectOption } from '../types'

export function getDemoSearchOptions(): readonly SelectOption[] {
  const mentors = MENTOR_DIRECTORY.filter((mentor) => mentor.domainId === 'it-frontend')
    .slice(0, DEMO_SEARCH_LIMIT)
    .map((mentor) => ({ value: mentor.name, label: mentor.name }))
  return [{ value: ANY_VALUE, label: DEMO_SEARCH_ALL_LABEL }, ...mentors]
}
