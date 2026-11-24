import { cn } from 'cn'
import { UserRound } from 'lucide-react'
import { AppLink, SectionCard } from '@/components'
import { ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS } from '@/constants'
import type { DirectoryMentor } from '@/types'
import { getMentorProfilePath } from '@/utils'
import { MENTORSHIP_GROUP, STUDENT_PROFILE_TEXT } from '../constants'
import { getSafeGroupUrl } from '../utils'
import { GroupButton } from './GroupButton'

type MentorshipCardProps = {
  mentor: DirectoryMentor
}

export function MentorshipCard({ mentor }: MentorshipCardProps) {
  return (
    <SectionCard
      title={STUDENT_PROFILE_TEXT.mentorshipTitle}
      aside={
        <span className="rounded-[12px] bg-tag px-2.5 py-1 text-[10px] uppercase">
          {STUDENT_PROFILE_TEXT.active}
        </span>
      }
    >
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full border-4 border-card bg-muted text-foreground/70 shadow-avatar">
          <UserRound aria-hidden="true" className="size-5 fill-current" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">{mentor.name}</p>
          <p className="text-xs text-muted-foreground">{STUDENT_PROFILE_TEXT.mentorMeta}</p>
        </div>
      </div>
      <p className="text-[13px] text-foreground">{STUDENT_PROFILE_TEXT.program}</p>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[11px] text-muted-foreground">
        {STUDENT_PROFILE_TEXT.mentorshipFacts.flat().map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        <AppLink
          to={getMentorProfilePath(mentor.id)}
          className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'min-h-9 text-sm')}
        >
          {STUDENT_PROFILE_TEXT.viewMentor}
        </AppLink>
        {MENTORSHIP_GROUP.isEnrolmentConfirmed && (
          <GroupButton url={getSafeGroupUrl(MENTORSHIP_GROUP.url)} />
        )}
      </div>
    </SectionCard>
  )
}
