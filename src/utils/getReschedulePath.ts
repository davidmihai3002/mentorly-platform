import { generatePath } from 'react-router'
import { BOOKING_PARAM_KEYS, ROUTES } from '@/constants'

export function getReschedulePath(mentorId: string, date: string, start: string): string {
  const search = new URLSearchParams({
    [BOOKING_PARAM_KEYS.previousDate]: date,
    [BOOKING_PARAM_KEYS.previousStart]: start,
  })
  return `${generatePath(ROUTES.reschedule, { mentorId })}?${search.toString()}`
}
