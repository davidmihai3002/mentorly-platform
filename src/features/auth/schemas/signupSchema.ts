import { z } from 'zod'
import { parseIsoDate, startOfToday } from '@/utils'
import { AUTH_ERRORS } from '../constants'
import { emailSchema, newPasswordSchema } from './passwordSchema'

export const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, AUTH_ERRORS.firstNameRequired),
    lastName: z.string().trim().min(1, AUTH_ERRORS.lastNameRequired),
    email: emailSchema,
    password: newPasswordSchema,
    confirmPassword: z.string().min(1, AUTH_ERRORS.confirmRequired),
    birthDate: z
      .string()
      .min(1, AUTH_ERRORS.birthDateRequired)
      .refine(
        (value) => (parseIsoDate(value)?.getTime() ?? Infinity) < startOfToday().getTime(),
        AUTH_ERRORS.birthDateInvalid,
      ),
    isTermsAccepted: z.boolean().refine((value) => value, {
      message: AUTH_ERRORS.termsRequired,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: AUTH_ERRORS.passwordsDiffer,
  })
