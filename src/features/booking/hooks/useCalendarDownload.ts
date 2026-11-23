import type { DirectoryMentor } from '@/types'
import { buildCalendarFile } from '../utils'

const CALENDAR_MIME = 'text/calendar;charset=utf-8'

export function useCalendarDownload() {
  return (mentor: DirectoryMentor, date: Date, slot: { start: string; end: string }) => {
    const url = URL.createObjectURL(
      new Blob([buildCalendarFile(mentor, date, slot)], { type: CALENDAR_MIME }),
    )
    const link = document.createElement('a')
    link.href = url
    link.download = `mentorly-${mentor.id}.ics`
    link.click()
    URL.revokeObjectURL(url)
  }
}
