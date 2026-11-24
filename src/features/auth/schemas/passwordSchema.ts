import { z } from 'zod'
import { AUTH_ERRORS } from '../constants'

export const newPasswordSchema = z
  .string()
  .min(1, AUTH_ERRORS.passwordRequired)
  .min(8, AUTH_ERRORS.passwordMin)
  .regex(/[A-Z]/, AUTH_ERRORS.passwordUppercase)
  .regex(/[0-9]/, AUTH_ERRORS.passwordDigit)

export const emailSchema = z
  .string()
  .trim()
  .min(1, AUTH_ERRORS.emailRequired)
  .pipe(z.email(AUTH_ERRORS.emailInvalid))
