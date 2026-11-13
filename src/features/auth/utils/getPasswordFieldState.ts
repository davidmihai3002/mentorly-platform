import { LOGIN_TEXT } from '../constants'
import type { PasswordFieldState } from '../types'

export function getPasswordFieldState(isVisible: boolean): PasswordFieldState {
  return {
    inputType: isVisible ? 'text' : 'password',
    toggleLabel: isVisible ? LOGIN_TEXT.hidePassword : LOGIN_TEXT.showPassword,
  }
}
