import { MENTOR_SCHEDULES } from '@/constants'
import type { DirectoryMentor } from '@/types'
import type { CalendarDay, TimeSlot } from '../types'
import { isWithinBookingWindow, parseIsoDate, startOfToday, toIsoDate } from './dates'

const SLOT_MINUTES = 60
const MINUTES_PER_HOUR = 60
const DAYS_PER_WEEK = 7
const LOOKAHEAD_DAYS = 60

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return (hours ?? 0) * MINUTES_PER_HOUR + (minutes ?? 0)
}

function toTime(totalMinutes: number): string {
  const hours = String(Math.floor(totalMinutes / MINUTES_PER_HOUR)).padStart(2, '0')
  const minutes = String(totalMinutes % MINUTES_PER_HOUR).padStart(2, '0')
  return `${hours}:${minutes}`
}

function isDemoBusy(date: Date, slotIndex: number): boolean {
  return date.getDate() % 2 === 1 && slotIndex === 1
}

export function getTimeSlots(mentor: DirectoryMentor, date: Date): readonly TimeSlot[] {
  const window = MENTOR_SCHEDULES[mentor.availability].find(
    (slot) => slot.weekday === date.getDay(),
  )
  if (!window) return []
  const count = (toMinutes(window.end) - toMinutes(window.start)) / SLOT_MINUTES
  return Array.from({ length: count }, (_, index) => {
    const start = toMinutes(window.start) + index * SLOT_MINUTES
    return {
      start: toTime(start),
      end: toTime(start + SLOT_MINUTES),
      isBusy: isDemoBusy(date, index),
    }
  })
}

export function isBookableDay(
  mentor: DirectoryMentor,
  date: Date,
  today: Date = startOfToday(),
): boolean {
  return (
    isWithinBookingWindow(date, today) && getTimeSlots(mentor, date).some((slot) => !slot.isBusy)
  )
}

export function buildMonthGrid(
  mentor: DirectoryMentor,
  year: number,
  month: number,
  today: Date = startOfToday(),
): readonly (CalendarDay | null)[] {
  const first = new Date(year, month, 1)
  const leadingBlanks = (first.getDay() + DAYS_PER_WEEK - 1) % DAYS_PER_WEEK
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(year, month, index + 1)
    return {
      iso: toIsoDate(date),
      dayOfMonth: index + 1,
      isAvailable: isBookableDay(mentor, date, today),
    }
  })
  return [...Array.from({ length: leadingBlanks }, () => null), ...days]
}

export function findFirstBookable(mentor: DirectoryMentor, today: Date = startOfToday()) {
  for (let offset = 0; offset <= LOOKAHEAD_DAYS; offset += 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)
    const slot = getTimeSlots(mentor, date).find((candidate) => !candidate.isBusy)
    if (slot) return { date: toIsoDate(date), start: slot.start }
  }
  return undefined
}

export function resolveSelection(
  mentor: DirectoryMentor,
  dateValue: string | null,
  startValue: string | null,
) {
  const date = parseIsoDate(dateValue)
  const slot = date
    ? getTimeSlots(mentor, date).find((candidate) => candidate.start === startValue)
    : undefined
  if (date && slot && !slot.isBusy && isBookableDay(mentor, date)) {
    return { date: toIsoDate(date), start: slot.start }
  }
  return findFirstBookable(mentor)
}

export function getFirstFreeStart(mentor: DirectoryMentor, iso: string): string {
  const date = parseIsoDate(iso)
  return (date ? getTimeSlots(mentor, date).find((slot) => !slot.isBusy)?.start : undefined) ?? ''
}
