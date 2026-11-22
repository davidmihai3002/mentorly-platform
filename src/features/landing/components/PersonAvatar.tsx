import { cn } from 'cn'
import { AVATAR_TONE_CLASS } from '../constants'
import type { Person } from '../types'

type PersonAvatarProps = {
  person: Person
  className?: string
}

export function PersonAvatar({ person, className }: PersonAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-[30px] shrink-0 place-items-center rounded-full text-[11px] font-semibold',
        AVATAR_TONE_CLASS[person.tone],
        className,
      )}
    >
      {person.initials}
    </span>
  )
}
