import { MENTOR_DIRECTORY } from '@/constants'
import { DASHBOARD_MENTOR_ID, DASHBOARD_TEXT } from '../constants'
import { DashboardHeader } from './DashboardHeader'

export function MentorDashboardPage() {
  const mentor = MENTOR_DIRECTORY.find((candidate) => candidate.id === DASHBOARD_MENTOR_ID)
  const firstName = mentor?.name.split(' ')[0] ?? ''

  return (
    <div className="flex flex-col gap-5">
      <title>{DASHBOARD_TEXT.pageTitle}</title>
      <DashboardHeader firstName={firstName} />
    </div>
  )
}
