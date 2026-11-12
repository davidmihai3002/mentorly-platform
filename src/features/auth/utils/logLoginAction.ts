import type { LoginAction, LoginFormInput, LoginLog } from '../types'
import { maskPassword } from './maskPassword'

export function buildLoginLog(action: LoginAction, values: LoginFormInput): LoginLog {
  return {
    action,
    email: values.email.trim(),
    password: maskPassword(values.password),
  }
}

export function logLoginAction(action: LoginAction, values: LoginFormInput): void {
  if (!import.meta.env.DEV) return
  console.log(`[Mentorly] ${action}`, buildLoginLog(action, values))
}
