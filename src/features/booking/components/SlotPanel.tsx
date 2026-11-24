import { formatDayMonthYear, formatLei, formatShortDay, parseIsoDate } from '@/utils'
import { cn } from 'cn'
import type { ReactNode } from 'react'
import type { DirectoryMentor } from '@/types'
import { BOOKING_CARD_CLASS, BOOKING_TAG_CLASS, BOOKING_TEXT } from '../constants'
import type { BookingSelection } from '../types'
import { getSessionTopic, getTimeSlots } from '../utils'
import { SlotList } from './SlotList'

type SlotPanelProps = {
  mentor: DirectoryMentor
  selection: BookingSelection
  onSelectStart: (start: string) => void
  footnote?: string
  children: ReactNode
}

export function SlotPanel({
  mentor,
  selection,
  onSelectStart,
  footnote,
  children,
}: SlotPanelProps) {
  const date = parseIsoDate(selection.date)
  const slots = date ? getTimeSlots(mentor, date) : []
  const slot = slots.find((candidate) => candidate.start === selection.start)

  return (
    <section aria-labelledby="slot-title" className={cn(BOOKING_CARD_CLASS, 'flex flex-col gap-4')}>
      {date && <span className={BOOKING_TAG_CLASS}>{formatShortDay(date)}</span>}
      <div className="flex flex-col gap-1">
        <h2 id="slot-title" className="text-xl font-bold tracking-[-0.02em] text-foreground">
          {BOOKING_TEXT.chooseTime}
        </h2>
        <p className="text-xs text-muted-foreground">{BOOKING_TEXT.duration}</p>
        <p className="text-xs text-muted-foreground">{BOOKING_TEXT.chooseFromAvailable}</p>
      </div>
      <SlotList slots={slots} selectedStart={selection.start} onSelect={onSelectStart} />
      {date && slot && !slot.isBusy && (
        <p aria-live="polite" className="text-sm font-semibold text-link">
          {formatDayMonthYear(date)}
          <br />
          {slot.start}–{slot.end}
        </p>
      )}
      <p className="text-[13px] text-foreground">
        {BOOKING_TEXT.sessionWith(mentor.name)}
        <br />
        {getSessionTopic(mentor)} · {formatLei(mentor.pricePerSession)}
      </p>
      {footnote && <p className="text-[11px] text-muted-foreground">{footnote}</p>}
      {children}
    </section>
  )
}
