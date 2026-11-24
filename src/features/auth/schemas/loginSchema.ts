import { z } from 'zod'
import { AUTH_ERRORS } from '../constants'
import { emailSchema } from './passwordSchema'

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, AUTH_ERRORS.passwordRequired),
})
