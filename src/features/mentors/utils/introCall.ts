import { WEEKDAY_NAMES } from '@/constants'
import type { IntroSlot } from '../types'

const INTRO_CALL_MINUTES = 20
const MINUTES_PER_HOUR = 60
const DAYS_PER_WEEK = 7

function addMinutes(time: string, minutes: number): string {
  const [hours, mins] = time.split(':').map(Number)
  const total = (hours ?? 0) * MINUTES_PER_HOUR + (mins ?? 0) + minutes
  return `${String(Math.floor(total / MINUTES_PER_HOUR)).padStart(2, '0')}:${String(total % MINUTES_PER_HOUR).padStart(2, '0')}`
}

export function formatIntroSlot(slot: IntroSlot): string {
  return `${WEEKDAY_NAMES[slot.weekday]}, ${slot.start}–${addMinutes(slot.start, INTRO_CALL_MINUTES)}`
}

export function nextIntroDate(slot: IntroSlot, today: Date = new Date()): Date {
  const offset = (slot.weekday - today.getDay() + DAYS_PER_WEEK) % DAYS_PER_WEEK
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)
}

export function formatIntroDate(slot: IntroSlot, today?: Date): string {
  const date = nextIntroDate(slot, today)
  const day = new Intl.DateTimeFormat('ro-RO', { day: 'numeric', month: 'long' }).format(date)
  return `${WEEKDAY_NAMES[slot.weekday]}, ${day} · ${slot.start}–${addMinutes(slot.start, INTRO_CALL_MINUTES)}`
}
