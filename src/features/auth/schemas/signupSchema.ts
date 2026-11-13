import { z } from 'zod'

export const signupSchema = z
  .object({
    fullName: z.string().trim().min(1, 'Introdu numele complet.'),
    email: z
      .string()
      .trim()
      .min(1, 'Introdu adresa de email.')
      .pipe(z.email('Adresa de email nu este validă.')),
    password: z
      .string()
      .min(1, 'Introdu parola.')
      .min(8, 'Parola trebuie să aibă cel puțin 8 caractere.')
      .regex(/[A-Z]/, 'Parola trebuie să conțină cel puțin o literă mare.')
      .regex(/[0-9]/, 'Parola trebuie să conțină cel puțin o cifră.'),
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
