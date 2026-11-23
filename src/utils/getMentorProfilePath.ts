import { generatePath } from 'react-router'
import { ROUTES } from '@/constants'

export function getMentorProfilePath(mentorId: string): string {
  return generatePath(ROUTES.mentorProfile, { mentorId })
}
