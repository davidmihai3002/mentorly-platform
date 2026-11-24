import { z } from 'zod'
import { AUTH_ERRORS } from '../constants'

const PASSWORD_MAX_BYTES = 72
const passwordEncoder = new TextEncoder()

export const newPasswordSchema = z
  .string()
  .min(1, AUTH_ERRORS.passwordRequired)
  .min(8, AUTH_ERRORS.passwordMin)
  .regex(/\p{L}/u, AUTH_ERRORS.passwordLetter)
  .regex(/[0-9]/, AUTH_ERRORS.passwordDigit)
  .refine(
    (value) => passwordEncoder.encode(value).length <= PASSWORD_MAX_BYTES,
    AUTH_ERRORS.passwordMax,
  )

export const emailSchema = z
  .string()
  .trim()
  .min(1, AUTH_ERRORS.emailRequired)
  .pipe(z.email(AUTH_ERRORS.emailInvalid))
