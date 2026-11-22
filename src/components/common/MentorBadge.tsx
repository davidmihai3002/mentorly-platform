import { MENTOR_TEXT } from '@/constants'
import type { MentorBadge as MentorBadgeType } from '@/types'
import { Tag } from './Tag'

type MentorBadgeProps = {
  badge: MentorBadgeType
  label?: string
}

export function MentorBadge({ badge, label }: MentorBadgeProps) {
  return <Tag className="font-medium uppercase">{label ?? MENTOR_TEXT.badge[badge]}</Tag>
}
