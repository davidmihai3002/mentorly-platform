import type { z } from 'zod'
import type { forgotPasswordSchema, resetPasswordSchema } from '../schemas'

export type ForgotPasswordInput = z.input<typeof forgotPasswordSchema>
export type ForgotPasswordOutput = z.output<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.input<typeof resetPasswordSchema>
export type ResetPasswordOutput = z.output<typeof resetPasswordSchema>
