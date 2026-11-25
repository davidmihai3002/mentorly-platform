import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { type AuthResponse, googleLogin } from '@/api'
import { useSession } from '@/session'
import { getAccountHome } from '@/utils'
import { AUTH_ERRORS } from '../constants'
import { getGoogleLoginError, getRedirectPath, isAccountMissing } from '../utils'

export function useGoogleAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useSession()
  const [pendingIdToken, setPendingIdToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const login = async (idToken: string) => {
    setError(null)
    let auth: AuthResponse
    try {
      auth = await googleLogin({ idToken })
    } catch (loginError) {
      if (isAccountMissing(loginError)) setPendingIdToken(idToken)
      else setError(getGoogleLoginError(loginError))
      return
    }
    signIn(auth)
    const target = getRedirectPath(location.state) ?? getAccountHome(auth.user.role)
    await navigate(target, { replace: true, viewTransition: true })
  }

  return {
    login,
    error,
    pendingIdToken,
    fail: () => setError(AUTH_ERRORS.googleFailed),
    closeSignup: () => setPendingIdToken(null),
  }
}
