import { ApiError } from '@/api'
import { AUTH_ERRORS } from '../constants'

type SignupError = {
  field: 'email' | 'birthDate' | 'root'
  message: string
}

function getStatus(error: unknown): number | null {
  return error instanceof ApiError ? error.status : null
}

export function getLoginError(error: unknown): string {
  return getStatus(error) === 401 ? AUTH_ERRORS.invalidCredentials : AUTH_ERRORS.generic
}

export function getSignupError(error: unknown): SignupError {
  const status = getStatus(error)
  if (status === 409) return { field: 'email', message: AUTH_ERRORS.emailTaken }
  if (status === 403) return { field: 'birthDate', message: AUTH_ERRORS.underAge }
  return { field: 'root', message: AUTH_ERRORS.generic }
}
