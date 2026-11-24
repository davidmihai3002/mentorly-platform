import { createContext } from 'react'
import type { AuthResponse, AuthUser } from '@/api'

export type SessionStatus = 'loading' | 'authenticated' | 'anonymous' | 'signedOut'

export type SessionValue = {
  user: AuthUser | null
  status: SessionStatus
  signIn: (auth: AuthResponse) => void
  signOut: () => void
}

export const SessionContext = createContext<SessionValue | null>(null)
