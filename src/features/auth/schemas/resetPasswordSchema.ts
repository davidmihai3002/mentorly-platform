import { z } from 'zod'
import { AUTH_ERRORS } from '../constants'
import { newPasswordSchema } from './passwordSchema'

export const resetPasswordSchema = z
  .object({
    password: newPasswordSchema,
    confirmPassword: z.string().min(1, AUTH_ERRORS.confirmRequired),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: AUTH_ERRORS.passwordsDiffer,
  })
