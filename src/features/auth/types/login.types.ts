import type { z } from 'zod'
import type { loginSchema } from '../schemas'

export type LoginFormInput = z.input<typeof loginSchema>

export type LoginFormOutput = z.output<typeof loginSchema>

export type PasswordFieldState = {
  inputType: 'password' | 'text'
  toggleLabel: string
}
