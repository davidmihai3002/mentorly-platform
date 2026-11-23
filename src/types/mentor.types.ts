export type DomainId = 'it-frontend' | 'management' | 'hr' | 'business' | 'ux-product' | 'marketing'

export type Domain = {
  readonly id: DomainId
  readonly label: string
  readonly icon: string
  readonly description: string
}

export type MentorBadge = 'top' | 'verified'

export type MentorReputation = {
  readonly reviewCount: number
  readonly sessionCount: number
}

export type Mentor = {
  readonly id: string
  readonly name: string
  readonly role: string
  readonly badge: MentorBadge
  readonly domainId: DomainId
  readonly domainLabel?: string
  readonly rating: number
  readonly reputation?: MentorReputation
  readonly description: string
  readonly pricePerSession: number
  readonly highlight?: string
}

export type MentorCardVariant = 'grid' | 'list'

export type HeadingLevel = 'h2' | 'h3'

export type MentorLanguage = 'ro' | 'en'

export type AvailabilityId = 'mon-thu' | 'tue-fri' | 'weekend'

export type WeeklySlot = {
  readonly weekday: number
  readonly start: string
  readonly end: string
}

export type DirectoryMentor = Mentor & {
  readonly languages: readonly MentorLanguage[]
  readonly availability: AvailabilityId
  readonly experienceYears: number
}
