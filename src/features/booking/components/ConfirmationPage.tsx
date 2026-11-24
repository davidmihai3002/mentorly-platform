import { formatLongDate, parseIsoDate } from '@/utils'
import { cn } from 'cn'
import { AppLink } from '@/components'
import {
  ROUNDED_BUTTON_CLASS,
  ROUNDED_OUTLINE_CLASS,
  ROUNDED_PRIMARY_CLASS,
  ROUTES,
} from '@/constants'
import { BOOKING_CARD_CLASS, BOOKING_TAG_CLASS, CONFIRMATION_TEXT } from '../constants'
import { useBookingContext, useCalendarDownload, useCheckoutState } from '../hooks'
import { buildBookingPath, getSessionTopic, getSlotEnd } from '../utils'
import { BookingNotFound } from './BookingNotFound'
import { BookingPageHeader } from './BookingPageHeader'
import { SuccessMark } from './SuccessMark'

export function ConfirmationPage() {
  const { mentor, selection } = useBookingContext()
  const checkout = useCheckoutState()
  const downloadCalendar = useCalendarDownload()
  const date = selection ? parseIsoDate(selection.date) : undefined
  const slot = selection ? { start: selection.start, end: getSlotEnd(selection.start) } : undefined

  if (!mentor || !selection || !date || !slot) return <BookingNotFound />

  return (
    <div className="flex flex-col gap-6">
      <title>{CONFIRMATION_TEXT.pageTitle}</title>
      <BookingPageHeader title={CONFIRMATION_TEXT.title} subtitle={CONFIRMATION_TEXT.subtitle} />
      <section
        aria-labelledby="confirmation-title"
        className={cn(BOOKING_CARD_CLASS, 'flex flex-col gap-4 shadow-card-soft')}
      >
        <SuccessMark />
        <span className={BOOKING_TAG_CLASS}>{CONFIRMATION_TEXT.paid(mentor.pricePerSession)}</span>
        <h2
          id="confirmation-title"
          className="text-[26px] leading-[1.2] font-bold tracking-[-0.02em] text-foreground"
        >
          {CONFIRMATION_TEXT.greeting(checkout?.firstName)}
        </h2>
        <p className="text-[13px] text-muted-foreground">
          {CONFIRMATION_TEXT.emailSent(checkout?.email)}
        </p>
        <p className="text-lg font-bold text-foreground">
          {mentor.name} · {getSessionTopic(mentor)}
        </p>
        <p className="text-sm leading-[1.6] text-foreground">
          {formatLongDate(date)} · {slot.start}–{slot.end}
          <br />
          {CONFIRMATION_TEXT.sessionMeta}
        </p>
        <p className="text-xs text-link">
          {CONFIRMATION_TEXT.reference(mentor.pricePerSession, checkout?.cardLast4)}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <AppLink to={ROUTES.student} className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}>
            {CONFIRMATION_TEXT.viewSession}
          </AppLink>
          <button
            type="button"
            onClick={() => downloadCalendar(mentor, date, slot)}
            className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'text-sm')}
          >
            {CONFIRMATION_TEXT.addToCalendar}
          </button>
        </div>
      </section>
      <ol className="grid gap-4 md:grid-cols-3">
        {CONFIRMATION_TEXT.nextSteps.map((step) => (
          <li
            key={step.title}
            className={cn(BOOKING_CARD_CLASS, 'flex flex-col gap-1.5 p-4 sm:p-4')}
          >
            <span className="text-sm font-bold text-foreground">{step.title}</span>
            <span className="text-xs text-muted-foreground">{step.text}</span>
          </li>
        ))}
      </ol>
      <p className="text-xs text-link">
        {CONFIRMATION_TEXT.rescheduleHint}{' '}
        <AppLink
          to={buildBookingPath(ROUTES.reschedule, mentor.id, undefined, selection)}
          state={checkout}
          className="rounded-sm underline underline-offset-2 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
        >
          {CONFIRMATION_TEXT.rescheduleLink}
        </AppLink>
      </p>
    </div>
  )
}
