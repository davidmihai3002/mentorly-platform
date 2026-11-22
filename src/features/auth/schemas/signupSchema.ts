import { z } from 'zod'
import { emailSchema, newPasswordSchema } from './passwordSchema'

export const signupSchema = z
  .object({
    fullName: z.string().trim().min(1, 'Introdu numele complet.'),
    email: emailSchema,
    password: newPasswordSchema,
    confirmPassword: z.string().min(1, 'Confirmă parola.'),
    isAgeConfirmed: z.boolean().refine((value) => value, {
      message: 'Confirmă că ai cel puțin 16 ani.',
    }),
    isTermsAccepted: z.boolean().refine((value) => value, {
      message: 'Acceptă Termenii și condițiile și Politica de confidențialitate.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Parolele nu coincid.',
  })
