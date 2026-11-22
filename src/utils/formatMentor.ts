import { DOMAINS, MENTOR_TEXT } from '@/constants'
import type { Domain, Mentor } from '@/types'

const RATING_FORMAT = new Intl.NumberFormat('ro-RO', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

export function formatReputation(mentor: Mentor): string {
  const rating = `★ ${RATING_FORMAT.format(mentor.rating)}`
  if (mentor.reviewCount === undefined || mentor.sessionCount === undefined) {
    return `${rating} · ${MENTOR_TEXT.illustrativeProfile}`
  }
  return `${rating} (${mentor.reviewCount} ${MENTOR_TEXT.reviews}) · ${mentor.sessionCount} ${MENTOR_TEXT.sessions}`
}

export function formatSessionPrice(price: number): string {
  return `${price} ${MENTOR_TEXT.pricePerSession}`
}

export function findDomain(domainId: Domain['id']): Domain | undefined {
  return DOMAINS.find((domain) => domain.id === domainId)
}
