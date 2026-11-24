import { TIME_ZONE } from '@/constants'
import type { DirectoryMentor } from '@/types'
import { toIsoDate } from '@/utils'

function toIcsStamp(date: Date, time: string): string {
  return `${toIsoDate(date).replaceAll('-', '')}T${time.replace(':', '')}00`
}

function escapeIcs(text: string): string {
  return text.replace(/[\\,;]/g, (match) => `\\${match}`)
}

export function buildCalendarFile(
  mentor: DirectoryMentor,
  date: Date,
  slot: { start: string; end: string },
): string {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Mentorly//Rezervare//RO',
    'BEGIN:VEVENT',
    `UID:${mentor.id}-${toIcsStamp(date, slot.start)}@mentorly.ro`,
    `DTSTAMP:${new Date()
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '')}`,
    `DTSTART;TZID=${TIME_ZONE}:${toIcsStamp(date, slot.start)}`,
    `DTEND;TZID=${TIME_ZONE}:${toIcsStamp(date, slot.end)}`,
    `SUMMARY:${escapeIcs(`Sesiune de mentorat cu ${mentor.name}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}
