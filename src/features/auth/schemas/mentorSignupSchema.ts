import { z } from 'zod'
import { emailSchema, newPasswordSchema } from './passwordSchema'

export const mentorSignupSchema = z.object({
  email: emailSchema,
  password: newPasswordSchema,
})
