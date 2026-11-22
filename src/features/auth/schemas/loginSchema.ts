import { z } from 'zod'
import { emailSchema } from './passwordSchema'

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Introdu parola.'),
})
