import { cn } from 'cn'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import { DASHBOARD_TEXT, UPCOMING_SESSIONS } from '../constants'
import { DashboardCard } from './DashboardCard'

export function UpcomingSessionsCard() {
  return (
    <DashboardCard title={DASHBOARD_TEXT.upcomingTitle}>
      <ul className="flex flex-col gap-3">
        {UPCOMING_SESSIONS.map((session) => (
          <li
            key={session.when}
            className="flex flex-col gap-1 rounded-[12px] border border-border bg-background/60 px-3 py-2.5"
          >
            <span className="text-xs font-bold text-link">{session.when}</span>
            <span className="text-xs text-foreground">
              {session.student} · {session.topic}
            </span>
          </li>
        ))}
      </ul>
      <a href="#calendar" className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, 'mt-auto')}>
        {DASHBOARD_TEXT.manageCalendar}
      </a>
    </DashboardCard>
  )
}
