import { ROUTES } from '@/constants'

export function getAccountHome(pathname: string): string {
  const isMentorArea = pathname === ROUTES.mentor || pathname.startsWith(`${ROUTES.mentor}/`)
  return isMentorArea ? ROUTES.mentor : ROUTES.student
}
