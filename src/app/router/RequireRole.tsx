import { Navigate, Outlet, useLocation } from 'react-router'
import type { UserRole } from '@/api'
import { LOGOUT_STATE, ROUTES } from '@/constants'
import { useSession } from '@/session'
import { getAccountHome } from '@/utils'
import { RouteFallback } from '../pages/RouteFallback'

type RequireRoleProps = {
  role: UserRole
}

export function RequireRole({ role }: RequireRoleProps) {
  const { status, user } = useSession()
  const { pathname, search } = useLocation()

  if (status === 'loading') return <RouteFallback />
  if (!user) {
    const state = status === 'signedOut' ? LOGOUT_STATE : { from: `${pathname}${search}` }
    return <Navigate to={ROUTES.login} replace state={state} />
  }
  if (user.role !== role) return <Navigate to={getAccountHome(user.role)} replace />
  return <Outlet />
}
