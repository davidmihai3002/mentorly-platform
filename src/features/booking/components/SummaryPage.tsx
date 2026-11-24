import { formatLei, formatLongDate, parseIsoDate } from '@/utils'
import { cn } from 'cn'
import { UserRound } from 'lucide-react'
import { AppLink } from '@/components'
import {
  ROUNDED_BUTTON_CLASS,
  ROUNDED_OUTLINE_CLASS,
  ROUNDED_PRIMARY_CLASS,
  ROUTES,
} from '@/constants'
import { BOOKING_CARD_CLASS, BOOKING_TAG_CLASS, SUMMARY_TEXT } from '../constants'
import { useBookingContext } from '../hooks'
import { buildBookingPath, getSessionTopic, getSlotEnd, isSelectionBookable } from '../utils'
import { BookingNotFound } from './BookingNotFound'
import { BookingPageHeader } from './BookingPageHeader'
import { BookingSteps } from './BookingSteps'
import { OrderLine } from './OrderLine'

export function SummaryPage() {
  const { mentor, selection } = useBookingContext()
  const date = selection ? parseIsoDate(selection.date) : undefined
  const slot = selection ? { start: selection.start, end: getSlotEnd(selection.start) } : undefined

  if (!mentor || !selection || !date || !slot || !isSelectionBookable(mentor, selection))
    return <BookingNotFound />

  const topic = getSessionTopic(mentor)
  const price = formatLei(mentor.pricePerSession)

  return (
    <div className="flex flex-col gap-6">
      <title>{SUMMARY_TEXT.pageTitle}</title>
      <BookingPageHeader title={SUMMARY_TEXT.title} subtitle={SUMMARY_TEXT.subtitle} />
      <BookingSteps current={0} />
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_230px]">
        <section
          aria-labelledby="summary-session"
          className={cn(BOOKING_CARD_CLASS, 'flex flex-col gap-4')}
        >
          <span className={BOOKING_TAG_CLASS}>{SUMMARY_TEXT.accepted}</span>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-full border-4 border-card bg-muted text-foreground/70 shadow-avatar">
              <UserRound aria-hidden="true" className="size-6 fill-current" />
            </span>
            <div>
              <p className="text-lg font-bold text-foreground">{mentor.name}</p>
              <p className="text-xs text-muted-foreground">{SUMMARY_TEXT.mentorMeta(topic)}</p>
            </div>
          </div>
          <h2 id="summary-session" className="text-base font-bold text-foreground">
            {SUMMARY_TEXT.sessionTitle}
          </h2>
          <p className="text-[13px] leading-[1.6] text-foreground">
            {formatLongDate(date)}
            <br />
            {slot.start}–{slot.end} · {SUMMARY_TEXT.timezone}
            <br />
            {SUMMARY_TEXT.format}
          </p>
          <p className="text-[13px] text-foreground">{SUMMARY_TEXT.objective}</p>
          <AppLink
            to={buildBookingPath(ROUTES.booking, mentor.id, selection)}
            className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'text-sm')}
          >
            {SUMMARY_TEXT.changeSlot}
          </AppLink>
          <p className="text-[11px] text-muted-foreground">{SUMMARY_TEXT.rescheduleNote}</p>
        </section>
        <section
          aria-labelledby="summary-order"
          className={cn(BOOKING_CARD_CLASS, 'flex flex-col gap-3')}
        >
          <h2 id="summary-order" className="text-lg font-bold text-foreground">
            {SUMMARY_TEXT.orderTitle}
          </h2>
          <dl className="flex flex-col gap-2.5">
            <OrderLine label={SUMMARY_TEXT.sessionLine} value={price} />
            <OrderLine label={SUMMARY_TEXT.fees} value={formatLei(0)} />
            <OrderLine label={SUMMARY_TEXT.total} value={price} isTotal />
          </dl>
          <p className="text-[11px] text-muted-foreground">{SUMMARY_TEXT.oneOff}</p>
          <AppLink
            to={buildBookingPath(ROUTES.bookingPayment, mentor.id, selection)}
            className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}
          >
            {SUMMARY_TEXT.continueToPayment}
          </AppLink>
          <p className="text-[11px] text-link">{SUMMARY_TEXT.securedBy}</p>
        </section>
      </div>
      <section className="rounded-[14px] border border-border bg-selected/70 p-5">
        <h2 className="text-sm font-bold text-link">{SUMMARY_TEXT.beforePaymentTitle}</h2>
        <p className="mt-1 text-[13px] text-foreground">{SUMMARY_TEXT.beforePaymentText}</p>
      </section>
    </div>
  )
}
