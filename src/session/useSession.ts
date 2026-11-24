import { useContext } from 'react'
import { SessionContext, type SessionValue } from './SessionContext'

export function useSession(): SessionValue {
  const session = useContext(SessionContext)
  if (!session) throw new Error('useSession must be used inside SessionProvider')
  return session
}
