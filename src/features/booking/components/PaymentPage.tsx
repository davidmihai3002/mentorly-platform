import { cn } from 'cn'
import { useNavigate } from 'react-router'
import { AppLink } from '@/components'
import { ROUTES } from '@/constants'
import { BOOKING_CARD_CLASS, PAYMENT_TEXT } from '../constants'
import { useBookingContext } from '../hooks'
import type { CheckoutState } from '../types'
import { buildBookingPath, formatLongDate, getTimeSlots, parseIsoDate } from '../utils'
import { BookingNotFound } from './BookingNotFound'
import { BookingPageHeader } from './BookingPageHeader'
import { BookingSteps } from './BookingSteps'
import { OrderLine } from './OrderLine'
import { PaymentForm } from './PaymentForm'

export function PaymentPage() {
  const { mentor, selection } = useBookingContext()
  const navigate = useNavigate()
  const date = selection ? parseIsoDate(selection.date) : undefined
  const slot =
    mentor && date
      ? getTimeSlots(mentor, date).find((item) => item.start === selection?.start)
      : undefined

  if (!mentor || !selection || !date || !slot) return <BookingNotFound />

  const price = `${mentor.pricePerSession} lei`

  function handlePaid(details: CheckoutState) {
    if (!mentor || !selection) return
    navigate(buildBookingPath(ROUTES.bookingConfirmed, mentor.id, selection), {
      state: details,
      viewTransition: true,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <title>{PAYMENT_TEXT.pageTitle}</title>
      <BookingPageHeader title={PAYMENT_TEXT.title} subtitle={PAYMENT_TEXT.subtitle} />
      <BookingSteps current={1} />
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_230px]">
        <PaymentForm
          amount={mentor.pricePerSession}
          onPaid={handlePaid}
          backLink={
            <AppLink
              to={buildBookingPath(ROUTES.bookingSummary, mentor.id, selection)}
              className="w-fit rounded-sm text-xs font-medium text-link hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
            >
              <span aria-hidden="true">← </span>
              {PAYMENT_TEXT.backToSummary}
            </AppLink>
          }
        />
        <section
          aria-labelledby="payment-order"
          className={cn(BOOKING_CARD_CLASS, 'flex flex-col gap-3')}
        >
          <h2 id="payment-order" className="text-lg font-bold text-foreground">
            {PAYMENT_TEXT.orderTitle}
          </h2>
          <p className="text-sm font-semibold text-foreground">{mentor.name}</p>
          <p className="text-xs leading-[1.6] text-foreground">
            {formatLongDate(date)} · {slot.start}–{slot.end}
            <br />
            Online · {PAYMENT_TEXT.orderMeta}
          </p>
          <dl className="flex flex-col gap-2.5">
            <OrderLine label={PAYMENT_TEXT.session} value={price} />
            <OrderLine label="Taxe suplimentare" value="0 lei" />
            <OrderLine label={PAYMENT_TEXT.total} value={price} isTotal />
          </dl>
          <p className="text-[11px] text-muted-foreground">{PAYMENT_TEXT.receiptNote}</p>
        </section>
      </div>
    </div>
  )
}
