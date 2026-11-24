import { WEEKDAY_NAMES } from '@/constants'
import { INTRO_CALL_MINUTES } from '../constants'
import type { IntroSlot } from '../types'

const MINUTES_PER_HOUR = 60
const DAYS_PER_WEEK = 7
const MINUTES_PER_DAY = 24 * MINUTES_PER_HOUR

function toMinutes(time: string): number {
  const [hours, mins] = time.split(':').map(Number)
  return (hours ?? 0) * MINUTES_PER_HOUR + (mins ?? 0)
}

function addMinutes(time: string, minutes: number): string {
  const total = (toMinutes(time) + minutes) % MINUTES_PER_DAY
  return `${String(Math.floor(total / MINUTES_PER_HOUR)).padStart(2, '0')}:${String(total % MINUTES_PER_HOUR).padStart(2, '0')}`
}

export function formatIntroSlot(slot: IntroSlot): string {
  return `${WEEKDAY_NAMES[slot.weekday]}, ${slot.start}–${addMinutes(slot.start, INTRO_CALL_MINUTES)}`
}

export function nextIntroDate(slot: IntroSlot, today: Date = new Date()): Date {
  const dayOffset = (slot.weekday - today.getDay() + DAYS_PER_WEEK) % DAYS_PER_WEEK
  const nowMinutes = today.getHours() * MINUTES_PER_HOUR + today.getMinutes()
  const hasPassedToday = dayOffset === 0 && toMinutes(slot.start) <= nowMinutes
  const offset = hasPassedToday ? DAYS_PER_WEEK : dayOffset
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)
}

export function formatIntroDate(slot: IntroSlot, today?: Date): string {
  const date = nextIntroDate(slot, today)
  const day = new Intl.DateTimeFormat('ro-RO', { day: 'numeric', month: 'long' }).format(date)
  return `${WEEKDAY_NAMES[slot.weekday]}, ${day} · ${slot.start}–${addMinutes(slot.start, INTRO_CALL_MINUTES)}`
}
