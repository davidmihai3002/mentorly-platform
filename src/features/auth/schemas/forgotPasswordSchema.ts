import { z } from 'zod'
import { emailSchema } from './passwordSchema'

export const forgotPasswordSchema = z.object({ email: emailSchema })
