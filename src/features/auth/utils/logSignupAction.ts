import type { SignupAction, SignupFormInput, SignupLog } from '../types'
import { maskPassword } from './maskPassword'

export const EMPTY_SIGNUP_VALUES: SignupFormInput = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  isAgeConfirmed: false,
  isTermsAccepted: false,
}

export function buildSignupLog(action: SignupAction, values: SignupFormInput): SignupLog {
  return {
    action,
    fullName: values.fullName.trim(),
    email: values.email.trim(),
    password: maskPassword(values.password),
    confirmPassword: maskPassword(values.confirmPassword),
    isAgeConfirmed: values.isAgeConfirmed,
    isTermsAccepted: values.isTermsAccepted,
  }
}

export function logSignupAction(action: SignupAction, values: SignupFormInput): void {
  if (!import.meta.env.DEV) return
  console.log(`[Mentorly] ${action}`, buildSignupLog(action, values))
}
