import { z } from 'zod'

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
  const now = new Date()
  return year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1)
}

export const paymentSchema = z.object({
  email: z.email('Introdu o adresă de email validă.'),
  cardholder: z.string().trim().min(3, 'Introdu numele de pe card.').max(80),
  cardNumber: z
    .string()
    .transform((value) => value.replace(/\s+/g, ''))
    .refine(
      (value) => CARD_DIGITS.test(value) && passesLuhn(value),
      'Numărul cardului nu este valid.',
    ),
  expiry: z
    .string()
    .trim()
    .refine(isFutureExpiry, 'Folosește formatul LL / AA, cu o dată viitoare.'),
  cvc: z.string().trim().regex(CVC, 'CVC-ul are 3 sau 4 cifre.'),
  address: z.string().trim().min(5, 'Introdu adresa de facturare.').max(120),
  city: z.string().trim().min(2, 'Introdu localitatea.').max(60),
  postalCode: z.string().trim().regex(POSTAL_CODE, 'Codul poștal are 6 cifre.'),
  country: z.literal('RO'),
  acceptTerms: z.boolean().refine((value) => value, 'Trebuie să accepți termenii ca să continui.'),
})

export type PaymentInput = z.input<typeof paymentSchema>
export type PaymentOutput = z.output<typeof paymentSchema>
