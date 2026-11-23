import { useLocation } from 'react-router'
import { SAMPLE_STUDENT } from '@/constants'
import type { CheckoutState } from '../types'

const DEMO_CARD_LAST4 = '4242'

function isCheckoutState(value: unknown): value is CheckoutState {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.firstName === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.cardLast4 === 'string'
  )
}

export function useCheckoutState(): CheckoutState {
  const { state } = useLocation()
  return isCheckoutState(state)
    ? state
    : {
        firstName: SAMPLE_STUDENT.firstName,
        email: SAMPLE_STUDENT.email,
        cardLast4: DEMO_CARD_LAST4,
      }
}
