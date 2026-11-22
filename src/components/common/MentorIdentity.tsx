import type { HeadingLevel, Mentor } from '@/types'
import { MentorAvatar } from './MentorAvatar'
import { MentorNameRole } from './MentorNameRole'

type MentorIdentityProps = {
  mentor: Pick<Mentor, 'name' | 'role'>
  nameId?: string
  headingLevel?: HeadingLevel
}

export function MentorIdentity({ mentor, nameId, headingLevel }: MentorIdentityProps) {
  return (
    <div className="flex items-start gap-3">
      <MentorAvatar />
      <div className="pt-1">
        <MentorNameRole mentor={mentor} nameId={nameId} headingLevel={headingLevel} />
      </div>
    </div>
  )
}
