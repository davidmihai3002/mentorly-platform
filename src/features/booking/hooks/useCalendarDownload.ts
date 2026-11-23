import type { DirectoryMentor } from '@/types'
import { buildCalendarFile } from '../utils'

const CALENDAR_MIME = 'text/calendar;charset=utf-8'
const REVOKE_DELAY_MS = 1000

export function useCalendarDownload() {
  return (mentor: DirectoryMentor, date: Date, slot: { start: string; end: string }) => {
    const url = URL.createObjectURL(
      new Blob([buildCalendarFile(mentor, date, slot)], { type: CALENDAR_MIME }),
    )
    const link = document.createElement('a')
    link.href = url
    link.download = `mentorly-${mentor.id}.ics`
    document.body.append(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), REVOKE_DELAY_MS)
  }
}
