import { cn } from 'cn'
import { AppLink } from '@/components'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, ROUTES } from '@/constants'
import { BOOKING_CARD_CLASS, BOOKING_TEXT } from '../constants'

export function BookingNotFound() {
  return (
    <section
      className={cn(
        BOOKING_CARD_CLASS,
        'mx-auto flex max-w-md flex-col items-center gap-3 text-center',
      )}
    >
      <title>{BOOKING_TEXT.notFoundTitle}</title>
      <h1 className="text-2xl font-bold text-foreground">{BOOKING_TEXT.notFoundTitle}</h1>
      <p className="text-sm text-muted-foreground">{BOOKING_TEXT.notFoundText}</p>
      <AppLink to={ROUTES.mentors} className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}>
        {BOOKING_TEXT.backToSearch}
      </AppLink>
    </section>
  )
}
