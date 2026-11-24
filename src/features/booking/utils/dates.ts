export const BOOKING_WINDOW_DAYS = 60
const DAY_MS = 86_400_000

function toUtcDay(date: Date): number {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / DAY_MS
}

export function daysBetween(from: Date, to: Date): number {
  return toUtcDay(to) - toUtcDay(from)
}

export function isWithinBookingWindow(date: Date, today: Date): boolean {
  const diff = daysBetween(today, date)
  return diff >= 0 && diff <= BOOKING_WINDOW_DAYS
}

export function lastBookableDay(today: Date): Date {
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + BOOKING_WINDOW_DAYS)
}
