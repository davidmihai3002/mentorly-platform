import type { z } from 'zod'
import type { signupSchema } from '../schemas'

export type SignupFormInput = z.input<typeof signupSchema>

export type SignupFormOutput = z.output<typeof signupSchema>
