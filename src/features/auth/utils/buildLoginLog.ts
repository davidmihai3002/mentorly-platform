import type { LoginAction, LoginFormInput, LoginLog } from '../types'
import { maskPassword } from './maskPassword'

/** Datele colectate până acum, pregătite pentru consolă (parola mascată). */
export function buildLoginLog(action: LoginAction, values: LoginFormInput): LoginLog {
  return {
    action,
    email: values.email.trim(),
    password: maskPassword(values.password),
  }
}
