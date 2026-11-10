import type { LoginAction, LoginFormInput } from '../types'
import { buildLoginLog } from './buildLoginLog'

/**
 * TEMPORAR, până la backend: fiecare buton afișează în consolă datele completate până în acel
 * moment, cu parola mascată. Doar în dezvoltare (emailul e o dată personală).
 * Datele reale pleacă prin HTTPS, ca JSON; backend-ul întoarce un JWT, păstrat în cookie.
 */
export function logLoginAction(action: LoginAction, values: LoginFormInput): void {
  if (!import.meta.env.DEV) return
  console.log(`[Mentorly] ${action}`, buildLoginLog(action, values))
}
