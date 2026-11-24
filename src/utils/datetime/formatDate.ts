import { LOCALE } from '@/constants'

const LONG_DATE_FORMAT = new Intl.DateTimeFormat(LOCALE, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
const DAY_MONTH_YEAR_FORMAT = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
const DAY_MONTH_FORMAT = new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'long' })
const SHORT_WEEKDAY_FORMAT = new Intl.DateTimeFormat(LOCALE, { weekday: 'short' })
const MONTH_TITLE_FORMAT = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric' })

function capitalize(text: string): string {
  return text.charAt(0).toLocaleUpperCase(LOCALE) + text.slice(1)
}

export function formatLongDate(date: Date): string {
  return capitalize(LONG_DATE_FORMAT.format(date))
}

export function formatDayMonthYear(date: Date): string {
  return DAY_MONTH_YEAR_FORMAT.format(date)
}

export function formatDayMonth(date: Date): string {
  return DAY_MONTH_FORMAT.format(date)
}

export function formatShortDay(date: Date): string {
  const weekday = SHORT_WEEKDAY_FORMAT.format(date).replace('.', '')
  return `${weekday} · ${formatDayMonth(date)}`.toLocaleUpperCase(LOCALE)
}

export function formatMonthTitle(year: number, month: number): string {
  return capitalize(MONTH_TITLE_FORMAT.format(new Date(year, month, 1)))
}
