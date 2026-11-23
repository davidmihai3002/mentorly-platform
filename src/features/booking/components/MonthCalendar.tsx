import { cn } from 'cn'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { DirectoryMentor } from '@/types'
import { BOOKING_CARD_CLASS, BOOKING_TEXT } from '../constants'
import {
  buildMonthGrid,
  formatLongDate,
  formatMonthTitle,
  lastBookableDay,
  parseIsoDate,
  startOfToday,
} from '../utils'

type MonthCalendarProps = {
  mentor: DirectoryMentor
  selectedDate: string
  onSelect: (iso: string) => void
}

const MONTHS_PER_YEAR = 12

export function MonthCalendar({ mentor, selectedDate, onSelect }: MonthCalendarProps) {
  const today = startOfToday()
  const initial = parseIsoDate(selectedDate) ?? today
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() })
  const days = buildMonthGrid(mentor, view.year, view.month, today)
  const isCurrentMonth = view.year === today.getFullYear() && view.month === today.getMonth()
  const lastDay = lastBookableDay(today)
  const isLastMonth = view.year === lastDay.getFullYear() && view.month === lastDay.getMonth()

  function shiftMonth(delta: number) {
    setView((current) => {
      const index = current.year * MONTHS_PER_YEAR + current.month + delta
      return { year: Math.floor(index / MONTHS_PER_YEAR), month: index % MONTHS_PER_YEAR }
    })
  }

  return (
    <section
      aria-labelledby="calendar-title"
      className={cn(BOOKING_CARD_CLASS, 'flex flex-col gap-4')}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          aria-label={BOOKING_TEXT.previousMonth}
          disabled={isCurrentMonth}
          onClick={() => shiftMonth(-1)}
          className="grid size-8 place-items-center rounded-full text-link hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-30"
        >
          <ChevronLeft aria-hidden="true" className="size-4" />
        </button>
        <h2 id="calendar-title" aria-live="polite" className="text-lg font-bold text-foreground">
          {formatMonthTitle(view.year, view.month)}
        </h2>
        <button
          type="button"
          aria-label={BOOKING_TEXT.nextMonth}
          disabled={isLastMonth}
          onClick={() => shiftMonth(1)}
          className="grid size-8 place-items-center rounded-full text-link hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-30"
        >
          <ChevronRight aria-hidden="true" className="size-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center">
        <div aria-hidden="true" className="contents">
          {BOOKING_TEXT.weekdays.map((weekday, index) => (
            <span key={BOOKING_TEXT.weekdayNames[index]} className="text-xs text-muted-foreground">
              {weekday}
            </span>
          ))}
        </div>
        <ul role="list" className="contents">
          {days.map((day, index) =>
            day ? (
              <li key={day.iso} className="grid place-items-center">
                <button
                  type="button"
                  disabled={!day.isAvailable}
                  aria-pressed={day.iso === selectedDate}
                  aria-label={formatLongDate(parseIsoDate(day.iso) ?? today)}
                  onClick={() => onSelect(day.iso)}
                  className={cn(
                    'grid h-9 w-11 place-items-center rounded-[8px] text-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none',
                    'disabled:cursor-default disabled:text-muted-foreground/60',
                    'enabled:bg-selected enabled:font-semibold enabled:text-link enabled:hover:bg-tag',
                    'aria-pressed:bg-primary! aria-pressed:text-primary-foreground!',
                  )}
                >
                  {day.dayOfMonth}
                </button>
              </li>
            ) : (
              <li key={`blank-${index}`} aria-hidden="true" />
            ),
          )}
        </ul>
      </div>
      <p className="text-[11px] text-link">{BOOKING_TEXT.calendarLegend}</p>
    </section>
  )
}
