const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const LOCALE = 'ro-RO'
const BOOKING_WINDOW_DAYS = 60
const DAY_MS = 86_400_000

export function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function parseIsoDate(value: string | null): Date | undefined {
  if (!value || !ISO_DATE_PATTERN.test(value)) return undefined
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year ?? 0, (month ?? 1) - 1, day ?? 1)
  return toIsoDate(date) === value ? date : undefined
}

export function startOfToday(now: Date = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function isWithinBookingWindow(date: Date, today: Date): boolean {
  const diff = (date.getTime() - today.getTime()) / DAY_MS
  return diff >= 0 && diff <= BOOKING_WINDOW_DAYS
}

export function formatLongDate(date: Date): string {
  const text = new Intl.DateTimeFormat(LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
  return text.charAt(0).toLocaleUpperCase(LOCALE) + text.slice(1)
}

export function formatDayMonthYear(date: Date): string {
  return new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'long', year: 'numeric' }).format(
    date,
  )
}

export function formatShortDay(date: Date): string {
  const weekday = new Intl.DateTimeFormat(LOCALE, { weekday: 'short' })
    .format(date)
    .replace('.', '')
  const dayMonth = new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'long' }).format(date)
  return `${weekday} · ${dayMonth}`.toLocaleUpperCase(LOCALE)
}

export function formatMonthTitle(year: number, month: number): string {
  const text = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric' }).format(
    new Date(year, month, 1),
  )
  return text.charAt(0).toLocaleUpperCase(LOCALE) + text.slice(1)
}
