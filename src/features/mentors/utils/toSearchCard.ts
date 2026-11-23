import { AVAILABILITY_LABELS, LANGUAGE_LABELS } from '@/constants'
import type { DirectoryMentor } from '@/types'
import { SEARCH_TEXT } from '../constants'
import type { ViewId } from '../types'

export function toSearchCard(mentor: DirectoryMentor, view: ViewId): DirectoryMentor {
  const days = AVAILABILITY_LABELS[mentor.availability]
  const highlight =
    view === 'grid'
      ? `${SEARCH_TEXT.available} · ${days}`
      : [days, ...mentor.languages.map((language) => LANGUAGE_LABELS[language])].join(' · ')
  return { ...mentor, highlight }
}
