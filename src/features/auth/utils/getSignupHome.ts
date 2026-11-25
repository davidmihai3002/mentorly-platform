import type { UserRole } from '@/api'
import { ROUTES } from '@/constants'

export function getSignupHome(role: UserRole): string {
  return role === 'MENTOR' ? ROUTES.mentorApplication : ROUTES.quiz
}
