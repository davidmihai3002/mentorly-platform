import type { UserRole } from '@/api'
import { ROUTES } from '@/constants'

export function getAccountHome(role: UserRole): string {
  return role === 'MENTOR' ? ROUTES.mentor : ROUTES.student
}
