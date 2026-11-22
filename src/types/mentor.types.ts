export type DomainId = 'it-frontend' | 'management' | 'hr' | 'business' | 'ux-product' | 'marketing'

export type Domain = {
  id: DomainId
  label: string
  icon: string
  description: string
}

export type MentorBadge = 'top' | 'verified'

export type Mentor = {
  id: string
  name: string
  role: string
  badge: MentorBadge
  domainId: DomainId
  domainLabel?: string
  rating: number
  reviewCount?: number
  sessionCount?: number
  description: string
  pricePerSession: number
}

export type MentorCardVariant = 'grid' | 'list'
