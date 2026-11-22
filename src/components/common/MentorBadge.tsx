import { MENTOR_TEXT } from '@/constants'
import type { MentorBadge as MentorBadgeType } from '@/types'
import { Tag } from './Tag'

type MentorBadgeProps = {
  badge: MentorBadgeType
}

export function MentorBadge({ badge }: MentorBadgeProps) {
  return <Tag className="font-medium uppercase">{MENTOR_TEXT.badge[badge]}</Tag>
}
