import { MENTOR_SCHEDULES } from '@/constants'
import type { DirectoryMentor } from '@/types'
import type { BookingSelection, CalendarDay, TimeSlot } from '../types'
import {
  BOOKING_WINDOW_DAYS,
  daysBetween,
  isWithinBookingWindow,
  parseIsoDate,
  startOfToday,
  toIsoDate,
} from './dates'

const SLOT_MINUTES = 60
const MINUTES_PER_HOUR = 60
const DAYS_PER_WEEK = 7

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

function hasStarted(date: Date, startMinutes: number, now: Date): boolean {
  if (daysBetween(now, date) !== 0) return daysBetween(now, date) < 0
  return startMinutes <= now.getHours() * MINUTES_PER_HOUR + now.getMinutes()
}

export function getTimeSlots(
  mentor: DirectoryMentor,
  date: Date,
  now: Date = new Date(),
): readonly TimeSlot[] {
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
      isBusy: isDemoBusy(date, index) || hasStarted(date, start, now),
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

export function findFirstBookable(
  mentor: DirectoryMentor,
  today: Date = startOfToday(),
): BookingSelection | undefined {
  for (let offset = 0; offset <= BOOKING_WINDOW_DAYS; offset += 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)
    const slot = getTimeSlots(mentor, date).find((candidate) => !candidate.isBusy)
    if (slot) return { date: toIsoDate(date), start: slot.start }
  }
  return undefined
}

export function parseSelection(
  mentor: DirectoryMentor,
  dateValue: string | null,
  startValue: string | null,
): BookingSelection | undefined {
  const date = parseIsoDate(dateValue)
  if (!date) return undefined
  const window = MENTOR_SCHEDULES[mentor.availability].find(
    (slot) => slot.weekday === date.getDay(),
  )
  if (!window || !startValue) return undefined
  const slotStarts = Array.from(
    { length: (toMinutes(window.end) - toMinutes(window.start)) / SLOT_MINUTES },
    (_, index) => toTime(toMinutes(window.start) + index * SLOT_MINUTES),
  )
  return slotStarts.includes(startValue) ? { date: toIsoDate(date), start: startValue } : undefined
}

export function isSelectionBookable(mentor: DirectoryMentor, selection: BookingSelection): boolean {
  const date = parseIsoDate(selection.date)
  if (!date || !isBookableDay(mentor, date)) return false
  return getTimeSlots(mentor, date).some((slot) => slot.start === selection.start && !slot.isBusy)
}

export function getFirstFreeStart(mentor: DirectoryMentor, iso: string): string {
  const date = parseIsoDate(iso)
  return (date ? getTimeSlots(mentor, date).find((slot) => !slot.isBusy)?.start : undefined) ?? ''
}

export function getSlotEnd(start: string): string {
  return toTime(toMinutes(start) + SLOT_MINUTES)
}
