import { generatePath } from 'react-router'
import { ROUTES } from '@/constants'

export function getBookingPath(mentorId: string): string {
  return generatePath(ROUTES.booking, { mentorId })
}
