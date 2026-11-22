import { z } from 'zod'

export const newPasswordSchema = z
  .string()
  .min(1, 'Introdu parola.')
  .min(8, 'Parola trebuie să aibă cel puțin 8 caractere.')
  .regex(/[A-Z]/, 'Parola trebuie să conțină cel puțin o literă mare.')
  .regex(/[0-9]/, 'Parola trebuie să conțină cel puțin o cifră.')

export const emailSchema = z
  .string()
  .trim()
  .min(1, 'Introdu adresa de email.')
  .pipe(z.email('Adresa de email nu este validă.'))
