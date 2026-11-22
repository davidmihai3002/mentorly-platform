import type { z } from 'zod'
import type { forgotPasswordSchema, mentorSignupSchema, resetPasswordSchema } from '../schemas'

export type ForgotPasswordInput = z.input<typeof forgotPasswordSchema>
export type ForgotPasswordOutput = z.output<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.input<typeof resetPasswordSchema>
export type ResetPasswordOutput = z.output<typeof resetPasswordSchema>
export type MentorSignupInput = z.input<typeof mentorSignupSchema>
export type MentorSignupOutput = z.output<typeof mentorSignupSchema>
export type MentorDocument = 'linkedin' | 'cv'
