import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { paymentSchema, type PaymentInput, type PaymentOutput } from '../schemas'
import type { CheckoutState } from '../types'

const CARD_LAST_DIGITS = 4

export function usePaymentForm(onPaid: (details: CheckoutState) => void) {
  const form = useForm<PaymentInput, unknown, PaymentOutput>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      email: '',
      cardholder: '',
      cardNumber: '',
      expiry: '',
      cvc: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'RO',
      acceptTerms: false,
    },
  })

  const submit = form.handleSubmit((values) => {
    onPaid({
      email: values.email,
      firstName: values.cardholder.split(' ')[0] ?? values.cardholder,
      cardLast4: values.cardNumber.slice(-CARD_LAST_DIGITS),
    })
  })

  return { form, submit }
}
