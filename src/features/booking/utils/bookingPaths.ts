import { generatePath } from 'react-router'
import { ROUTES } from '@/constants'
import { BOOKING_PARAM_KEYS } from '../constants'
import type { BookingSelection } from '../types'

type BookingRoute =
  | typeof ROUTES.booking
  | typeof ROUTES.bookingSummary
  | typeof ROUTES.bookingPayment
  | typeof ROUTES.bookingConfirmed
  | typeof ROUTES.reschedule
  | typeof ROUTES.rescheduleConfirmed

export function buildBookingPath(
  route: BookingRoute,
  mentorId: string,
  selection?: BookingSelection,
  previous?: BookingSelection,
): string {
  const entries = [
    selection && [BOOKING_PARAM_KEYS.date, selection.date],
    selection && [BOOKING_PARAM_KEYS.start, selection.start],
    previous && [BOOKING_PARAM_KEYS.previousDate, previous.date],
    previous && [BOOKING_PARAM_KEYS.previousStart, previous.start],
  ].filter((entry): entry is string[] => Array.isArray(entry))
  const search = new URLSearchParams(entries).toString()
  return `${generatePath(route, { mentorId })}${search ? `?${search}` : ''}`
}
