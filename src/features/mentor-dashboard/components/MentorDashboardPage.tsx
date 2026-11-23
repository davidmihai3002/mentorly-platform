import { getFirstName } from '@/utils'
import { MENTOR_DIRECTORY } from '@/constants'
import { DASHBOARD_MENTOR_ID, DASHBOARD_TEXT } from '../constants'
import { DashboardHeader } from './DashboardHeader'
import { EarningsCard } from './EarningsCard'
import { StatsRow } from './StatsRow'
import { StudentsCard } from './StudentsCard'
import { UpcomingSessionsCard } from './UpcomingSessionsCard'
import { WeekCard } from './WeekCard'

export function MentorDashboardPage() {
  const mentor = MENTOR_DIRECTORY.find((candidate) => candidate.id === DASHBOARD_MENTOR_ID)
  const firstName = mentor ? getFirstName(mentor.name) : DASHBOARD_TEXT.fallbackName

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
