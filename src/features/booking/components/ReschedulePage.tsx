import { formatLongDate, parseIsoDate } from '@/utils'
import { cn } from 'cn'
import { useId, useState } from 'react'
import { useNavigate } from 'react-router'
import { AppLink } from '@/components'
import {
  ROUNDED_BUTTON_CLASS,
  ROUNDED_OUTLINE_CLASS,
  ROUNDED_PRIMARY_CLASS,
  ROUTES,
} from '@/constants'
import { BOOKING_CARD_CLASS, MESSAGE_MAX_LENGTH, RESCHEDULE_TEXT } from '../constants'
import { useBookingContext, useCheckoutState } from '../hooks'
import type { BookingSelection } from '../types'
import {
  buildBookingPath,
  findFirstBookable,
  getFirstFreeStart,
  getSlotEnd,
  isSelectionBookable,
} from '../utils'
import { BookingNotFound } from './BookingNotFound'
import { BookingPageHeader } from './BookingPageHeader'
import { CurrentBookingCard } from './CurrentBookingCard'
import { MonthCalendar } from './MonthCalendar'
import { SlotPanel } from './SlotPanel'

export function ReschedulePage() {
  const checkout = useCheckoutState()
  const { mentor, selection: requested, previous } = useBookingContext()
  const selection =
    mentor && requested && isSelectionBookable(mentor, requested)
      ? requested
      : mentor && findFirstBookable(mentor)
  const navigate = useNavigate()
  const messageId = useId()
  const [isSameSlot, setIsSameSlot] = useState(false)
  const previousDate = previous ? parseIsoDate(previous.date) : undefined
  const previousSlot = previous
    ? { start: previous.start, end: getSlotEnd(previous.start) }
    : undefined

  if (!mentor || !selection || !previous || !previousDate || !previousSlot)
    return <BookingNotFound />

  function select(next: BookingSelection) {
    if (!mentor) return
    setIsSameSlot(false)
    navigate(buildBookingPath(ROUTES.reschedule, mentor.id, next, previous), {
      replace: true,
      preventScrollReset: true,
    })
  }

  function confirm() {
    if (!mentor || !selection || !previous) return
    if (selection.date === previous.date && selection.start === previous.start) {
      setIsSameSlot(true)
      return
    }
    navigate(buildBookingPath(ROUTES.rescheduleConfirmed, mentor.id, selection, previous), {
      state: checkout,
      viewTransition: true,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <title>{RESCHEDULE_TEXT.pageTitle}</title>
      <BookingPageHeader title={RESCHEDULE_TEXT.title} subtitle={RESCHEDULE_TEXT.subtitle} />
      <CurrentBookingCard
        dateLabel={formatLongDate(previousDate)}
        time={`${previousSlot.start}–${previousSlot.end}`}
      />
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <MonthCalendar
          mentor={mentor}
          selectedDate={selection.date}
          onSelect={(iso) => select({ date: iso, start: getFirstFreeStart(mentor, iso) })}
        />
        <SlotPanel
          mentor={mentor}
          selection={selection}
          onSelectStart={(start) => select({ ...selection, start })}
          footnote={RESCHEDULE_TEXT.noExtraCost}
        >
          {isSameSlot && (
            <p role="alert" className="text-xs font-medium text-destructive">
              {RESCHEDULE_TEXT.sameSlot}
            </p>
          )}
          <button
            type="button"
            onClick={confirm}
            className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}
          >
            {RESCHEDULE_TEXT.confirm}
          </button>
          <AppLink
            to={buildBookingPath(ROUTES.bookingConfirmed, mentor.id, previous)}
            className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'text-sm')}
          >
            {RESCHEDULE_TEXT.keep}
          </AppLink>
        </SlotPanel>
      </div>
      <div className={cn(BOOKING_CARD_CLASS, 'flex flex-col gap-2 p-4 sm:p-5')}>
        <label htmlFor={messageId} className="text-[13px] font-semibold text-foreground">
          {RESCHEDULE_TEXT.messageLabel}
        </label>
        <textarea
          id={messageId}
          rows={2}
          maxLength={MESSAGE_MAX_LENGTH}
          placeholder={RESCHEDULE_TEXT.messagePlaceholder}
          className="w-full resize-y rounded-[10px] border border-border bg-card px-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        />
      </div>
    </div>
  )
}
