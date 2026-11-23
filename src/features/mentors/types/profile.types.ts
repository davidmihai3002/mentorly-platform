import type { DirectoryMentor } from '@/types'

export type ExternalLink = {
  readonly label: string
  readonly href: string
}

export type ProfileReview = {
  readonly id: string
  readonly author: string
  readonly rating: number
  readonly date: string
  readonly quote: string
}

export type ApplicationQuestion = {
  readonly id: string
  readonly label: string
  readonly placeholder: string
}

export type MentorProfile = {
  readonly mentor: DirectoryMentor
  readonly category: string
  readonly meta: string
  readonly badges: readonly string[]
  readonly links: readonly ExternalLink[]
  readonly sponsorNote?: string
  readonly about: {
    readonly title: string
    readonly text: string
    readonly tags: readonly string[]
  }
  readonly audience: {
    readonly requirements: string
    readonly fit: string
  }
  readonly workStyle: {
    readonly paragraphs: readonly string[]
    readonly note?: string
  }
  readonly pricing: {
    readonly monthlyPrice: number
    readonly monthlyMeta: string
    readonly discountNote: string
  }
  readonly capacity: {
    readonly max: number
    readonly current: number
  }
  readonly availability: {
    readonly introSlots: readonly string[]
  }
  readonly experience?: {
    readonly jobs: readonly { readonly title: string; readonly meta: string }[]
    readonly links: readonly ExternalLink[]
    readonly achievement: string
    readonly certifications: readonly string[]
    readonly recommendation: { readonly quote: string; readonly author: string }
  }
  readonly reviews: {
    readonly criteria: readonly { readonly label: string; readonly score: number }[]
    readonly items: readonly ProfileReview[]
  }
  readonly applicationQuestions: readonly ApplicationQuestion[]
  readonly admissionTest?: {
    readonly intro: string
    readonly resources: readonly ExternalLink[]
    readonly questions: readonly ApplicationQuestion[]
  }
}
