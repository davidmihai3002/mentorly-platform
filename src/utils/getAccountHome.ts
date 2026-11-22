import { ROUTES } from '@/constants'

export function getAccountHome(pathname: string): string {
  return pathname.startsWith(ROUTES.mentor) ? ROUTES.mentor : ROUTES.student
}
