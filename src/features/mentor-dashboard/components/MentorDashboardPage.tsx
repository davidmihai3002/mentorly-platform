import { useSession } from '@/session'
import { DASHBOARD_TEXT } from '../constants'
import { DashboardHeader } from './DashboardHeader'
import { EarningsCard } from './EarningsCard'
import { StatsRow } from './StatsRow'
import { StudentsCard } from './StudentsCard'
import { UpcomingSessionsCard } from './UpcomingSessionsCard'
import { WeekCard } from './WeekCard'

export function MentorDashboardPage() {
  const { user } = useSession()
  const firstName = user?.firstName ?? DASHBOARD_TEXT.fallbackName

  return (
    <div className="flex flex-col gap-5">
      <title>{DASHBOARD_TEXT.pageTitle}</title>
      <DashboardHeader firstName={firstName} />
      <StatsRow />
      <div className="grid items-stretch gap-5 lg:grid-cols-2">
        <EarningsCard />
        <UpcomingSessionsCard />
      </div>
      <WeekCard />
      <StudentsCard />
    </div>
  )
}
