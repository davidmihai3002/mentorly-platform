import { APP_LOCALE, APP_TIME_ZONE, TIME_ZONE_LABEL } from './constants'

/** O dată primită de la API (șir ISO 8601 cu fus orar) sau un obiect `Date`. */
export type DateInput = Date | string

export type DateStyle = 'short' | 'medium' | 'long' | 'full'

/**
 * Interval săptămânal recurent al unui mentor (de ex. „Luni 18–20”).
 * Orele sunt ora României, nu momente în timp.
 */
export type WeeklySlot = {
  /** Ziua săptămânii după ISO 8601: 1 = luni … 7 = duminică. */
  dayOfWeek: number
  /** Ora de început, format `HH:mm` (00:00–23:59). */
  startTime: string
  /** Ora de sfârșit, format `HH:mm`, după ora de început. */
  endTime: string
}

const EN_DASH = '–'
const ZONE_SUFFIX = ` (${TIME_ZONE_LABEL})`

const WEEKDAYS = ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Sâmbătă', 'Duminică'] as const

/**
 * Acceptăm doar ISO 8601 cu fus orar explicit (`Z` sau `±HH:mm`). O dată fără fus
 * orar (`2026-11-09T17:00:00`) e interpretată de browser în fusul utilizatorului și
 * ar afișa ora greșit, deci o refuzăm.
 *
 * Fracțiunile de secundă pot avea oricâte cifre (Python trimite 6, .NET 7). Le
 * scurtăm la milisecunde înainte de `new Date()`, singura precizie garantată de
 * specificația JavaScript în toate browserele.
 */
const ISO_WITH_ZONE =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?(Z|[+-]\d{2}:\d{2})$/

const TIME_OF_DAY = /^([01]\d|2[0-3]):[0-5]\d$/

const DATE_FORMATTERS: Record<DateStyle, Intl.DateTimeFormat> = {
  short: createDateFormatter('short'),
  medium: createDateFormatter('medium'),
  long: createDateFormatter('long'),
  full: createDateFormatter('full'),
}

const TIME_FORMATTER = new Intl.DateTimeFormat(APP_LOCALE, {
  timeZone: APP_TIME_ZONE,
  timeStyle: 'short',
})

function createDateFormatter(dateStyle: DateStyle): Intl.DateTimeFormat {
  return new Intl.DateTimeFormat(APP_LOCALE, { timeZone: APP_TIME_ZONE, dateStyle })
}

function invalid(value: unknown): RangeError {
  return new RangeError(`Dată invalidă: ${JSON.stringify(value) ?? String(value)}`)
}

/** Verifică că ziua există în calendar (respinge de ex. 30 februarie). */
function isRealCalendarDay(year: number, month: number, day: number): boolean {
  const probe = new Date(0)
  // setUTCFullYear, nu Date.UTC: Date.UTC mută anii 0–99 în 1900–1999.
  probe.setUTCFullYear(year, month - 1, day)
  return (
    probe.getUTCFullYear() === year &&
    probe.getUTCMonth() === month - 1 &&
    probe.getUTCDate() === day
  )
}

function parseIsoString(value: string): Date {
  const match = ISO_WITH_ZONE.exec(value)
  if (!match) throw invalid(value)

  const [, year, month, day, hour, minute, second = '00', fraction, zone] = match
  const isValidTime = Number(hour) <= 23 && Number(minute) <= 59 && Number(second) <= 59
  if (!isValidTime || !isRealCalendarDay(Number(year), Number(month), Number(day))) {
    throw invalid(value)
  }

  const millis = (fraction ?? '').slice(0, 3).padEnd(3, '0')
  const normalized = `${year}-${month}-${day}T${hour}:${minute}:${second}.${millis}${zone}`
  const date = new Date(normalized)
  if (Number.isNaN(date.getTime())) throw invalid(value)
  return date
}

/** Transformă o intrare nesigură într-un `Date` valid sau aruncă `RangeError`. */
function toDate(value: DateInput): Date {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) throw invalid(value)
    return value
  }
  if (typeof value !== 'string') throw invalid(value)
  return parseIsoString(value)
}

function toOrderedRange(start: DateInput, end: DateInput): [Date, Date] {
  const startDate = toDate(start)
  const endDate = toDate(end)
  if (endDate.getTime() <= startDate.getTime()) {
    throw new RangeError('Interval invalid: sfârșitul trebuie să fie după început')
  }
  return [startDate, endDate]
}

function isTimeOfDay(value: unknown): value is string {
  return typeof value === 'string' && TIME_OF_DAY.test(value)
}

function isSameDayInRomania(a: Date, b: Date): boolean {
  return DATE_FORMATTERS.short.format(a) === DATE_FORMATTERS.short.format(b)
}

/** `"9 noiembrie 2026"` (implicit) · `"09.11.2026"` · `"9 nov. 2026"` · `"luni, 9 noiembrie 2026"` */
export function formatDate(value: DateInput, style: DateStyle = 'long'): string {
  return DATE_FORMATTERS[style].format(toDate(value))
}

/** `"19:00"` — ora României, cu trecerea automată la ora de vară. */
export function formatTime(value: DateInput): string {
  return TIME_FORMATTER.format(toDate(value))
}

/** `"9 noiembrie 2026, 19:00 (ora României)"` */
export function formatDateTime(value: DateInput): string {
  const date = toDate(value)
  return `${formatDate(date)}, ${formatTime(date)}${ZONE_SUFFIX}`
}

/** `"19:00–20:00 (ora României)"` */
export function formatTimeRange(start: DateInput, end: DateInput): string {
  const [startDate, endDate] = toOrderedRange(start, end)
  return `${formatTime(startDate)}${EN_DASH}${formatTime(endDate)}${ZONE_SUFFIX}`
}

/**
 * Descrierea completă a unei ședințe programate.
 *
 * Notă: în noaptea trecerii la ora de iarnă (ultima duminică din octombrie), o ședință
 * 03:30 (ora de vară) – 03:10 (ora de iarnă) e validă, dar se afișează „03:30–03:10”.
 * Acceptăm cazul: ședințele se programează în intervalele de zi ale mentorilor.
 *
 * - aceeași zi: `"luni, 9 noiembrie 2026, 19:00–20:00 (ora României)"`
 * - peste miezul nopții: `"luni, 9 noiembrie 2026, 23:30 – marți, 10 noiembrie 2026, 00:30 (ora României)"`
 */
export function formatSessionSlot(start: DateInput, end: DateInput): string {
  const [startDate, endDate] = toOrderedRange(start, end)
  const startDay = formatDate(startDate, 'full')

  if (isSameDayInRomania(startDate, endDate)) {
    return `${startDay}, ${formatTime(startDate)}${EN_DASH}${formatTime(endDate)}${ZONE_SUFFIX}`
  }

  const endDay = formatDate(endDate, 'full')
  return `${startDay}, ${formatTime(startDate)} ${EN_DASH} ${endDay}, ${formatTime(endDate)}${ZONE_SUFFIX}`
}

/** `"Luni, 18:00–20:00 (ora României)"` — pentru disponibilitatea săptămânală a mentorului. */
export function formatWeeklySlot(slot: WeeklySlot): string {
  if (typeof slot !== 'object' || slot === null) {
    throw new RangeError('Interval săptămânal lipsă')
  }
  const { dayOfWeek, startTime, endTime } = slot
  if (!Number.isInteger(dayOfWeek) || dayOfWeek < 1 || dayOfWeek > WEEKDAYS.length) {
    throw new RangeError(`Zi a săptămânii invalidă (aștept 1–7): ${String(dayOfWeek)}`)
  }
  if (!isTimeOfDay(startTime) || !isTimeOfDay(endTime)) {
    throw new RangeError(
      `Oră invalidă (aștept HH:mm): ${JSON.stringify(startTime)}, ${JSON.stringify(endTime)}`,
    )
  }
  // Formatul HH:mm cu zero în față se poate compara direct ca text.
  if (endTime <= startTime) {
    throw new RangeError(`Interval invalid: ${endTime} nu este după ${startTime}`)
  }

  return `${WEEKDAYS[dayOfWeek - 1]}, ${startTime}${EN_DASH}${endTime}${ZONE_SUFFIX}`
}
