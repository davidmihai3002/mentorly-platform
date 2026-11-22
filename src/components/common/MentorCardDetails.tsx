import type { Mentor } from '@/types'
import { formatReputation } from '@/utils'
import { MentorBadge } from './MentorBadge'
import { SpecialtyChip } from './SpecialtyChip'

type MentorCardDetailsProps = {
  mentor: Mentor
}

export function MentorCardDetails({ mentor }: MentorCardDetailsProps) {
  return (
    <>
      <MentorBadge badge={mentor.badge} />
      <SpecialtyChip domainId={mentor.domainId} label={mentor.domainLabel} />
      <p className="text-xs leading-[1.45] font-medium tracking-[-0.02em] text-link">
        {formatReputation(mentor)}
      </p>
      <p className="text-[13px] leading-[1.45] tracking-[-0.02em] text-foreground">
        {mentor.description}
      </p>
    </>
  )
}
