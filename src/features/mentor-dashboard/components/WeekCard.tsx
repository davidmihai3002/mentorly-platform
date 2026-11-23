import { SectionCard } from '@/components'
import { DASHBOARD_TEXT, SECTION_IDS, WEEK } from '../constants'

export function WeekCard() {
  return (
    <SectionCard id={SECTION_IDS.calendar} title={DASHBOARD_TEXT.weekTitle}>
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
        {WEEK.map((day) => (
          <li
            key={day.label}
            className="flex flex-col gap-1 rounded-[12px] border border-border bg-background/60 p-2.5"
          >
            <span className="text-[11px] font-bold text-link">{day.label}</span>
            {day.entries.length > 0 ? (
              day.entries.map((entry) => (
                <span key={entry} className="text-[11px] text-muted-foreground">
                  {entry}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-muted-foreground">{DASHBOARD_TEXT.noSessions}</span>
            )}
          </li>
        ))}
      </ul>
    </SectionCard>
  )
}
