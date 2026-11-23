import { useLocation } from 'react-router'
import type { CheckoutState } from '../types'

function isCheckoutState(value: unknown): value is CheckoutState {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.firstName === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.cardLast4 === 'string'
  )
}

export function useCheckoutState(): CheckoutState | undefined {
  const { state } = useLocation()
  return isCheckoutState(state) ? state : undefined
}
