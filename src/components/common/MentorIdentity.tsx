import type { Mentor } from '@/types'
import { MentorAvatar } from './MentorAvatar'
import { MentorNameRole } from './MentorNameRole'

type MentorIdentityProps = {
  mentor: Pick<Mentor, 'name' | 'role'>
}

export function MentorIdentity({ mentor }: MentorIdentityProps) {
  return (
    <div className="flex items-start gap-3">
      <MentorAvatar />
      <div className="pt-1">
        <MentorNameRole mentor={mentor} />
      </div>
    </div>
  )
}
