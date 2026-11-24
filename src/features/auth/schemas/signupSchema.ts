import { z } from 'zod'
import { AUTH_ERRORS } from '../constants'
import { emailSchema, newPasswordSchema } from './passwordSchema'

export const signupSchema = z
  .object({
    fullName: z.string().trim().min(1, AUTH_ERRORS.fullNameRequired),
    email: emailSchema,
    password: newPasswordSchema,
    confirmPassword: z.string().min(1, AUTH_ERRORS.confirmRequired),
    isAgeConfirmed: z.boolean().refine((value) => value, {
      message: AUTH_ERRORS.ageRequired,
    }),
    isTermsAccepted: z.boolean().refine((value) => value, {
      message: AUTH_ERRORS.termsRequired,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: AUTH_ERRORS.passwordsDiffer,
  })
