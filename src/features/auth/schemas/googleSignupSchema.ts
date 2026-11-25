import { z } from 'zod'
import { birthDateSchema, termsSchema } from './signupSchema'

export const googleSignupSchema = z.object({
  role: z.enum(['MENTEE', 'MENTOR']),
  birthDate: birthDateSchema,
  isTermsAccepted: termsSchema,
})
