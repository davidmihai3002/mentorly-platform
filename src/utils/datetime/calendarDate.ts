import { TIME_ZONE } from '@/constants'
import { MINUTES_PER_HOUR } from './time'

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

const ZONED_PARTS_FORMAT = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hourCycle: 'h23',
})

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

export function nowInTimeZone(now: Date = new Date()): Date {
  const parts = Object.fromEntries(
    ZONED_PARTS_FORMAT.formatToParts(now).map((part) => [part.type, Number(part.value)]),
  )
  return new Date(
    parts.year ?? now.getFullYear(),
    (parts.month ?? 1) - 1,
    parts.day ?? 1,
    parts.hour ?? 0,
    parts.minute ?? 0,
    parts.second ?? 0,
  )
}

const OFFSET_FORMAT = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  timeZoneName: 'longOffset',
})
const OFFSET_PATTERN = /GMT([+-])(\d{2}):(\d{2})/
const MS_PER_MINUTE = 60_000

function timeZoneOffsetMinutes(instant: number): number {
  const name = OFFSET_FORMAT.formatToParts(instant).find((part) => part.type === 'timeZoneName')
  const match = OFFSET_PATTERN.exec(name?.value ?? '')
  if (!match) return 0
  const minutes = Number(match[2]) * MINUTES_PER_HOUR + Number(match[3])
  return match[1] === '-' ? -minutes : minutes
}

export function zonedTimeToUtc(date: Date, time: string): Date {
  const [hours, minutes] = time.split(':').map(Number)
  const wallClock = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    hours ?? 0,
    minutes ?? 0,
  )
  return new Date(wallClock - timeZoneOffsetMinutes(wallClock) * MS_PER_MINUTE)
}

export function startOfToday(now: Date = nowInTimeZone()): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}
