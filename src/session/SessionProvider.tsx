import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { type AuthResponse, type AuthUser, onSessionEnd, refresh, setAccessToken } from '@/api'
import { SessionContext, type SessionStatus } from './SessionContext'

type SessionProviderProps = {
  children: ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [status, setStatus] = useState<SessionStatus>('loading')

  const signIn = useCallback((auth: AuthResponse) => {
    setAccessToken(auth.accessToken)
    setUser(auth.user)
    setStatus('authenticated')
  }, [])

  const endSession = useCallback((nextStatus: 'anonymous' | 'signedOut') => {
    setAccessToken(null)
    setUser(null)
    setStatus(nextStatus)
  }, [])

  const signOut = useCallback(() => endSession('signedOut'), [endSession])

  useEffect(() => onSessionEnd(() => endSession('anonymous')), [endSession])

  useEffect(() => {
    let isActive = true
    refresh().then(
      (auth) => {
        if (isActive) signIn(auth)
      },
      () => {
        if (isActive) setStatus((current) => (current === 'loading' ? 'anonymous' : current))
      },
    )
    return () => {
      isActive = false
    }
  }, [signIn])

  const value = useMemo(() => ({ user, status, signIn, signOut }), [user, status, signIn, signOut])

  return <SessionContext value={value}>{children}</SessionContext>
}
