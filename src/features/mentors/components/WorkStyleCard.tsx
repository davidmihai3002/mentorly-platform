import { MessagesSquare } from 'lucide-react'
import { PROFILE_TEXT } from '../constants'
import type { MentorProfile } from '../types'
import { ProfileCard } from './ProfileCard'

type WorkStyleCardProps = {
  workStyle: MentorProfile['workStyle']
}

export function WorkStyleCard({ workStyle }: WorkStyleCardProps) {
  return (
    <ProfileCard title={PROFILE_TEXT.workStyleTitle}>
      {workStyle.paragraphs.map((paragraph) => (
        <p key={paragraph} className="text-sm leading-[1.55] text-foreground">
          {paragraph}
        </p>
      ))}
      {workStyle.note && (
        <p className="flex items-start gap-2.5 rounded-[12px] border border-border-soft bg-selected p-3 text-[13px] leading-[1.5] text-foreground">
          <MessagesSquare aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-link" />
          {workStyle.note}
        </p>
      )}
    </ProfileCard>
  )
}
