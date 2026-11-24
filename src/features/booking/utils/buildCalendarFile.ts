import type { DirectoryMentor } from '@/types'
import { zonedTimeToUtc } from '@/utils'

function toIcsUtcStamp(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
}

function escapeIcs(text: string): string {
  return text.replace(/[\\,;]/g, (match) => `\\${match}`)
}

export function buildCalendarFile(
  mentor: DirectoryMentor,
  date: Date,
  slot: { start: string; end: string },
): string {
  const start = toIcsUtcStamp(zonedTimeToUtc(date, slot.start))
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mentorly//Rezervare//RO',
    'BEGIN:VEVENT',
    `UID:${mentor.id}-${start}@mentorly.ro`,
    `DTSTAMP:${toIcsUtcStamp(new Date())}`,
    `DTSTART:${start}`,
    `DTEND:${toIcsUtcStamp(zonedTimeToUtc(date, slot.end))}`,
    `SUMMARY:${escapeIcs(`Sesiune de mentorat cu ${mentor.name}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}
