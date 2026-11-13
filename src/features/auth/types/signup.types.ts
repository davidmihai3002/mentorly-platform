import type { z } from 'zod'
import type { SIGNUP_ACTIONS } from '../constants'
import type { signupSchema } from '../schemas'

export type SignupFormInput = z.input<typeof signupSchema>

export type SignupFormOutput = z.output<typeof signupSchema>

export type SignupAction = (typeof SIGNUP_ACTIONS)[number]

export type SignupLog = {
  action: SignupAction
  fullName: string
  email: string
  password: string
  confirmPassword: string
  isAgeConfirmed: boolean
  isTermsAccepted: boolean
}
