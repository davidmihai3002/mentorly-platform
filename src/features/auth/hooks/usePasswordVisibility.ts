import { useState } from 'react'
import { getPasswordFieldState } from '../utils'

export function usePasswordVisibility() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev)
  }

  return {
    isVisible,
    toggleVisibility,
    ...getPasswordFieldState(isVisible),
  }
}
