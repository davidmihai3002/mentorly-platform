import type { z } from 'zod'
import type { LOGIN_ACTIONS } from '../constants'
import type { loginSchema } from '../schemas'

/** Valorile din formular, așa cum le scrie utilizatorul (înainte de validare). */
export type LoginFormInput = z.input<typeof loginSchema>

/** Valorile după validare (de ex. emailul fără spații). */
export type LoginFormOutput = z.output<typeof loginSchema>

export type LoginAction = (typeof LOGIN_ACTIONS)[number]

/** Ce ajunge în consolă: parola mereu mascată. */
export type LoginLog = {
  action: LoginAction
  email: string
  password: string
}
