import { ApiError } from '@/api'
import { AUTH_ERRORS, MENTOR_APPLICATION_TEXT } from '../constants'

type SignupError = {
  field: 'email' | 'birthDate' | 'root'
  message: string
}

type GoogleSignupError = {
  field: 'birthDate' | 'root'
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

export function isAccountMissing(error: unknown): boolean {
  return getStatus(error) === 404
}

export function getGoogleLoginError(error: unknown): string {
  return getStatus(error) === 401 ? AUTH_ERRORS.googleFailed : AUTH_ERRORS.generic
}

export function getGoogleSignupError(error: unknown): GoogleSignupError {
  const status = getStatus(error)
  if (status === 403) return { field: 'birthDate', message: AUTH_ERRORS.underAge }
  if (status === 409) return { field: 'root', message: AUTH_ERRORS.emailTaken }
  if (status === 401) return { field: 'root', message: AUTH_ERRORS.googleFailed }
  return { field: 'root', message: AUTH_ERRORS.generic }
}

export function getApplicationError(error: unknown): string {
  return getStatus(error) === 409
    ? MENTOR_APPLICATION_TEXT.errors.alreadySubmitted
    : AUTH_ERRORS.generic
}
