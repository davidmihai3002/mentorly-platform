import type { LucideIcon } from 'lucide-react'

export type ArrowLinkTarget = {
  readonly label: string
  readonly to?: string
}

export type Benefit = {
  readonly id: string
  readonly icon: LucideIcon
  readonly title: string
  readonly text: string
  readonly link: ArrowLinkTarget
}

type AvatarTone = 'sky' | 'violet' | 'indigo'

export type Person = {
  readonly name: string
  readonly initials: string
  readonly tone: AvatarTone
}

export type Review = {
  readonly id: string
  readonly rating: number
  readonly quote: string
  readonly author: Person
  readonly role: string
  readonly mentorName: string
}

export type CommunityQuestion = {
  readonly id: string
  readonly category: string
  readonly postedAt: string
  readonly title: string
  readonly excerpt: string
  readonly answeredBy: Person
  readonly answerCount: number
  readonly likeCount: number
}

export type Partner = {
  readonly id: string
  readonly icon: LucideIcon
  readonly name: string
  readonly type: string
  readonly text: string
  readonly meta: string
  readonly link: ArrowLinkTarget
}
