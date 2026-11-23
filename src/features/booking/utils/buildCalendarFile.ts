import type { DirectoryMentor } from '@/types'

function toIcsStamp(date: Date, time: string): string {
  const [hours, minutes] = time.split(':')
  const day = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
  return `${day}T${hours ?? '00'}${minutes ?? '00'}00`
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
    `DTSTART;TZID=Europe/Bucharest:${toIcsStamp(date, slot.start)}`,
    `DTEND;TZID=Europe/Bucharest:${toIcsStamp(date, slot.end)}`,
    `SUMMARY:${escapeIcs(`Sesiune de mentorat cu ${mentor.name}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}
