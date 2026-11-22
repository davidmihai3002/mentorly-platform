import { DOMAINS, MENTOR_TEXT } from '@/constants'
import type { Domain, DomainId, Mentor } from '@/types'

const RATING_FORMAT = new Intl.NumberFormat('ro-RO', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

const COUNT_FORMAT = new Intl.NumberFormat('ro-RO')

export function formatReputation(mentor: Mentor): string {
  const rating = `★ ${RATING_FORMAT.format(mentor.rating)}`
  if (!mentor.reputation) return `${rating} · ${MENTOR_TEXT.illustrativeProfile}`
  const { reviewCount, sessionCount } = mentor.reputation
  return `${rating} (${COUNT_FORMAT.format(reviewCount)} ${MENTOR_TEXT.reviews}) · ${COUNT_FORMAT.format(sessionCount)} ${MENTOR_TEXT.sessions}`
}

export function formatSessionPrice(price: number): string {
  return `${COUNT_FORMAT.format(price)} ${MENTOR_TEXT.pricePerSession}`
}

export function findDomain(domainId: DomainId): Domain | undefined {
  return DOMAINS.find((domain) => domain.id === domainId)
}
