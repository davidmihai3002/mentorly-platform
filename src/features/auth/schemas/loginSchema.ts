import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Introdu adresa de email.')
    .pipe(z.email('Adresa de email nu este validă.')),
  password: z.string().min(1, 'Introdu parola.'),
})
