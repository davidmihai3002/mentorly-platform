import type { z } from 'zod'
import type { LOGIN_ACTIONS } from '../constants'
import type { loginSchema } from '../schemas'

export type LoginFormInput = z.input<typeof loginSchema>

export type LoginFormOutput = z.output<typeof loginSchema>

export type LoginAction = (typeof LOGIN_ACTIONS)[number]

export type LoginLog = {
  action: LoginAction
  email: string
  password: string
}

export type PasswordFieldState = {
  inputType: 'password' | 'text'
  toggleLabel: string
}
