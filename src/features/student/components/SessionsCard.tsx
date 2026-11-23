import { AppLink, SectionCard } from '@/components'
import { getBookingPath } from '@/utils'
import { SESSION_HISTORY, STUDENT_PROFILE_TEXT } from '../constants'

type SessionsCardProps = {
  mentorId: string
  mentorName: string
}

export function SessionsCard({ mentorId, mentorName }: SessionsCardProps) {
  return (
    <SectionCard title={STUDENT_PROFILE_TEXT.sessionsTitle}>
      <ul className="flex flex-col gap-3">
        {SESSION_HISTORY.map((session) => (
          <li key={`${session.day}-${session.title}`} className="flex items-center gap-3">
            <span className="grid w-11 shrink-0 place-items-center rounded-[10px] bg-selected py-1 text-link">
              <span className="text-lg leading-none font-bold">{session.day}</span>
              <span className="text-[9px] uppercase">{session.month}</span>
            </span>
            <div>
              <p className="text-[13px] font-semibold text-foreground">{session.title}</p>
              <p className="text-[11px] text-muted-foreground">{session.meta}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-muted-foreground">
        {STUDENT_PROFILE_TEXT.sessionsNote(mentorName)}
      </p>
      <AppLink
        to={getBookingPath(mentorId)}
        className="w-fit rounded-sm text-xs font-medium text-link hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
      >
        {STUDENT_PROFILE_TEXT.allBookings} <span aria-hidden="true">→</span>
      </AppLink>
    </SectionCard>
  )
}
