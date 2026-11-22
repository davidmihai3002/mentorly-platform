import { z } from 'zod'
import { newPasswordSchema } from './passwordSchema'

export const resetPasswordSchema = z
  .object({
    password: newPasswordSchema,
    confirmPassword: z.string().min(1, 'Confirmă parola.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Parolele nu coincid.',
  })
