import type { z } from 'zod'
import type { googleSignupSchema, signupSchema } from '../schemas'

export type SignupFormInput = z.input<typeof signupSchema>

export type SignupFormOutput = z.output<typeof signupSchema>

export type GoogleSignupInput = z.input<typeof googleSignupSchema>

export type GoogleSignupOutput = z.output<typeof googleSignupSchema>
