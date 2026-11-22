import { UserRound } from 'lucide-react'

export function MentorAvatar() {
  return (
    <span className="grid size-[52px] shrink-0 place-items-center rounded-full border-4 border-card bg-muted text-foreground/70 shadow-avatar">
      <UserRound aria-hidden="true" className="size-6 fill-current" />
    </span>
  )
}
