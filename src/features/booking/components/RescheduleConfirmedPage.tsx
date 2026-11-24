import { formatDayMonthYear, parseIsoDate } from '@/utils'
import { cn } from 'cn'
import { AppLink } from '@/components'
import {
  ROUNDED_BUTTON_CLASS,
  ROUNDED_OUTLINE_CLASS,
  ROUNDED_PRIMARY_CLASS,
  ROUTES,
} from '@/constants'
import { BOOKING_CARD_CLASS, BOOKING_TAG_CLASS, RESCHEDULE_TEXT } from '../constants'
import { useBookingContext, useCheckoutState, useCalendarDownload } from '../hooks'
import { buildBookingPath, getSlotEnd } from '../utils'
import { BookingNotFound } from './BookingNotFound'
import { BookingPageHeader } from './BookingPageHeader'
import { SlotSummaryBox } from './SlotSummaryBox'
import { SuccessMark } from './SuccessMark'

export function RescheduleConfirmedPage() {
  const checkout = useCheckoutState()
  const { mentor, selection, previous } = useBookingContext()
  const downloadCalendar = useCalendarDownload()
  const date = selection ? parseIsoDate(selection.date) : undefined
  const previousDate = previous ? parseIsoDate(previous.date) : undefined
  const slot = selection ? { start: selection.start, end: getSlotEnd(selection.start) } : undefined
  const previousSlot = previous
    ? { start: previous.start, end: getSlotEnd(previous.start) }
    : undefined

  if (!mentor || !selection || !date || !slot || !previousDate || !previousSlot)
    return <BookingNotFound />

  return (
    <div className="flex flex-col gap-6">
      <title>{RESCHEDULE_TEXT.confirmedPageTitle}</title>
      <BookingPageHeader
        title={RESCHEDULE_TEXT.confirmedTitle}
        subtitle={RESCHEDULE_TEXT.confirmedSubtitle}
      />
      <section
        aria-labelledby="reschedule-done"
        className={cn(BOOKING_CARD_CLASS, 'flex flex-col gap-4 shadow-card-soft')}
      >
        <SuccessMark />
        <span className={BOOKING_TAG_CLASS}>{RESCHEDULE_TEXT.confirmedBadge}</span>
        <h2
          id="reschedule-done"
          className="text-[26px] leading-[1.2] font-bold tracking-[-0.02em] text-foreground"
        >
          {RESCHEDULE_TEXT.confirmedHeadline}
        </h2>
        <p className="text-[13px] text-foreground">{RESCHEDULE_TEXT.bookingLine(mentor.name)}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <SlotSummaryBox
            label={RESCHEDULE_TEXT.previous}
            date={formatDayMonthYear(previousDate)}
            time={`${previousSlot.start}–${previousSlot.end}`}
          />
          <SlotSummaryBox
            label={RESCHEDULE_TEXT.next}
            date={formatDayMonthYear(date)}
            time={`${slot.start}–${slot.end}`}
            isHighlighted
          />
        </div>
        <p className="text-[11px] text-muted-foreground">{RESCHEDULE_TEXT.meta}</p>
        <p className="text-[13px] text-foreground">
          {RESCHEDULE_TEXT.notified(mentor.pricePerSession, checkout?.email)}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <AppLink
            to={buildBookingPath(ROUTES.bookingConfirmed, mentor.id, selection)}
            className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}
          >
            {RESCHEDULE_TEXT.viewUpdated}
          </AppLink>
          <button
            type="button"
            onClick={() => downloadCalendar(mentor, date, slot)}
            className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'text-sm')}
          >
            {RESCHEDULE_TEXT.updateCalendar}
          </button>
        </div>
      </section>
    </div>
  )
}
