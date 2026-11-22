import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { isLoggedOutState } from '../utils'

export function useLogoutNotice(): boolean {
  const location = useLocation()
  const navigate = useNavigate()
  const [hasLoggedOut] = useState(() => isLoggedOutState(location.state))

  useEffect(() => {
    if (!isLoggedOutState(location.state)) return
    void navigate(location.pathname, { replace: true, state: null })
  }, [location.pathname, location.state, navigate])

  return hasLoggedOut
}
