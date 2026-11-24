import { nowInTimeZone } from '@/utils'
import { z } from 'zod'
import { COUNTRY_OPTIONS, PAYMENT_ERRORS } from '../constants'

const CARD_DIGITS = /^\d{13,19}$/
const EXPIRY = /^(0[1-9]|1[0-2])\s?\/\s?(\d{2})$/
const CVC = /^\d{3,4}$/
const POSTAL_CODE = /^\d{6}$/
const CENTURY = 2000

function passesLuhn(digits: string): boolean {
  const sum = [...digits].reverse().reduce((total, char, index) => {
    const digit = Number(char)
    const doubled = index % 2 === 1 ? digit * 2 : digit
    return total + (doubled > 9 ? doubled - 9 : doubled)
  }, 0)
  return sum % 10 === 0
}

function isFutureExpiry(value: string): boolean {
  const match = EXPIRY.exec(value)
  if (!match) return false
  const month = Number(match[1])
  const year = CENTURY + Number(match[2])
  const now = nowInTimeZone()
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1)
}

export const paymentSchema = z.object({
  email: z.email(PAYMENT_ERRORS.email),
  cardholder: z.string().trim().min(3, PAYMENT_ERRORS.cardholder).max(80),
  cardNumber: z
    .string()
    .transform((value) => value.replace(/\s+/g, ''))
    .refine((value) => CARD_DIGITS.test(value) && passesLuhn(value), PAYMENT_ERRORS.cardNumber),
  expiry: z.string().trim().refine(isFutureExpiry, PAYMENT_ERRORS.expiry),
  cvc: z.string().trim().regex(CVC, PAYMENT_ERRORS.cvc),
  address: z.string().trim().min(5, PAYMENT_ERRORS.address).max(120),
  city: z.string().trim().min(2, PAYMENT_ERRORS.city).max(60),
  postalCode: z.string().trim().regex(POSTAL_CODE, PAYMENT_ERRORS.postalCode),
  country: z.enum(COUNTRY_OPTIONS.map((option) => option.value)),
  acceptTerms: z.boolean().refine((value) => value, PAYMENT_ERRORS.terms),
})

export type PaymentInput = z.input<typeof paymentSchema>
export type PaymentOutput = z.output<typeof paymentSchema>
