import { DASHBOARD_TEXT, MY_STUDENTS } from '../constants'
import { DashboardCard } from './DashboardCard'

export function StudentsCard() {
  return (
    <DashboardCard id="cursanti" title={DASHBOARD_TEXT.studentsTitle}>
      <ul className="flex flex-col gap-3">
        {MY_STUDENTS.map((student) => (
          <li
            key={student.name}
            className="grid gap-1 text-[13px] sm:grid-cols-[1fr_1fr_1fr] sm:items-center"
          >
            <span className="font-semibold text-foreground">{student.name}</span>
            <span className="text-xs text-muted-foreground">{student.progress}</span>
            <span className="text-xs font-medium text-primary">
              {student.action} <span aria-hidden="true">→</span>
            </span>
          </li>
        ))}
      </ul>
    </DashboardCard>
  )
}
