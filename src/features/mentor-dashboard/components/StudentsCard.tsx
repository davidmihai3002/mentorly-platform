import { DemoActionDialog, SectionCard } from '@/components'
import { DASHBOARD_TEXT, MY_STUDENTS, SECTION_IDS } from '../constants'

export function StudentsCard() {
  return (
    <SectionCard id={SECTION_IDS.students} title={DASHBOARD_TEXT.studentsTitle}>
      <ul className="flex flex-col gap-3">
        {MY_STUDENTS.map((student) => (
          <li
            key={student.name}
            className="grid gap-1 border-t border-border pt-3 text-[13px] first:border-t-0 first:pt-0 sm:grid-cols-[1fr_1fr_1fr] sm:items-center"
          >
            <span className="font-semibold text-foreground">{student.name}</span>
            <span className="text-xs text-muted-foreground">{student.progress}</span>
            <DemoActionDialog
              trigger={
                <button
                  type="button"
                  className="w-fit rounded-sm text-left text-xs font-medium text-link hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {student.action}
                </button>
              }
            />
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}
