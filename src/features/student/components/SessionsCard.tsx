import { cn } from 'cn'
import { AppLink, SectionCard } from '@/components'
import { getBookingPath } from '@/utils'
import type { DirectoryMentor } from '@/types'
import { SESSION_HISTORY, STUDENT_PROFILE_TEXT } from '../constants'
import { QuickRating } from './QuickRating'
import { SessionDetailsDialog } from './SessionDetailsDialog'

type SessionsCardProps = {
  mentor: DirectoryMentor
}

const SESSION_TITLE_CLASS = 'text-[13px] font-semibold text-foreground'

export function SessionsCard({ mentor }: SessionsCardProps) {
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
              {session.upcoming ? (
                <SessionDetailsDialog
                  mentor={mentor}
                  session={session.upcoming}
                  trigger={
                    <button
                      type="button"
                      className={cn(
                        SESSION_TITLE_CLASS,
                        'rounded-sm text-left underline-offset-2 hover:text-link hover:underline focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none',
                      )}
                    >
                      {session.title}
                    </button>
                  }
                />
              ) : (
                <p className={SESSION_TITLE_CLASS}>{session.title}</p>
              )}
              <p className="text-[11px] text-muted-foreground">{session.meta}</p>
              {session.isRateable && <QuickRating sessionTitle={session.title} />}
            </div>
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-muted-foreground">
        {STUDENT_PROFILE_TEXT.sessionsNote(mentor.name)}
      </p>
      <AppLink
        to={getBookingPath(mentor.id)}
        className="w-fit rounded-sm text-xs font-medium text-link hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
      >
        {STUDENT_PROFILE_TEXT.allBookings} <span aria-hidden="true">→</span>
      </AppLink>
    </SectionCard>
  )
}
