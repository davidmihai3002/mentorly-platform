import { WEEKDAY_NAMES } from '@/constants'
import {
  addMinutes,
  formatDayMonth,
  formatTimeRange,
  MINUTES_PER_HOUR,
  nowInTimeZone,
  toMinutes,
} from '@/utils'
import { INTRO_CALL_MINUTES } from '../constants'
import type { IntroSlot } from '../types'

const DAYS_PER_WEEK = 7

function formatIntroTime(slot: IntroSlot): string {
  return formatTimeRange(slot.start, addMinutes(slot.start, INTRO_CALL_MINUTES))
}

export function formatIntroSlot(slot: IntroSlot): string {
  return `${WEEKDAY_NAMES[slot.weekday]}, ${formatIntroTime(slot)}`
}

export function nextIntroDate(slot: IntroSlot, today: Date = nowInTimeZone()): Date {
  const dayOffset = (slot.weekday - today.getDay() + DAYS_PER_WEEK) % DAYS_PER_WEEK
  const nowMinutes = today.getHours() * MINUTES_PER_HOUR + today.getMinutes()
  const hasPassedToday = dayOffset === 0 && toMinutes(slot.start) <= nowMinutes
  const offset = hasPassedToday ? DAYS_PER_WEEK : dayOffset
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset)
}

export function formatIntroDate(slot: IntroSlot, today?: Date): string {
  const day = formatDayMonth(nextIntroDate(slot, today))
  return `${WEEKDAY_NAMES[slot.weekday]}, ${day} · ${formatIntroTime(slot)}`
}
