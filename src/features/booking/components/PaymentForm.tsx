import { cn } from 'cn'
import type { ReactNode } from 'react'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import {
  BOOKING_CARD_CLASS,
  BOOKING_INPUT_CLASS,
  BOOKING_TAG_CLASS,
  COUNTRY_OPTIONS,
  PAYMENT_TEXT,
} from '../constants'
import { usePaymentForm } from '../hooks'
import type { CheckoutState } from '../types'
import { PaymentField } from './PaymentField'

type PaymentFormProps = {
  amount: number
  backLink: ReactNode
  onPaid: (details: CheckoutState) => void
}

export function PaymentForm({ amount, backLink, onPaid }: PaymentFormProps) {
  const { form, submit } = usePaymentForm(onPaid)
  const { errors } = form.formState

  return (
    <form
      noValidate
      onSubmit={submit}
      aria-labelledby="payment-title"
      className={cn(BOOKING_CARD_CLASS, 'flex flex-col gap-4')}
    >
      <h2 id="payment-title" className="text-xl font-bold text-foreground">
        {PAYMENT_TEXT.paymentTitle}
      </h2>
      <span className={BOOKING_TAG_CLASS}>{PAYMENT_TEXT.provider}</span>
      <PaymentField
        label="Email pentru confirmare"
        type="email"
        autoComplete="email"
        placeholder="andreea.marin@example.com"
        registration={form.register('email')}
        error={errors.email?.message}
      />
      <PaymentField
        label="Nume titular card"
        autoComplete="cc-name"
        placeholder="Andreea Marin"
        registration={form.register('cardholder')}
        error={errors.cardholder?.message}
      />
      <PaymentField
        label="Număr card"
        inputMode="numeric"
        autoComplete="cc-number"
        placeholder="4242 4242 4242 4242"
        maxLength={23}
        registration={form.register('cardNumber')}
        error={errors.cardNumber?.message}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <PaymentField
          label="Data expirării"
          inputMode="numeric"
          autoComplete="cc-exp"
          placeholder="12 / 28"
          maxLength={7}
          registration={form.register('expiry')}
          error={errors.expiry?.message}
        />
        <PaymentField
          label="CVC"
          inputMode="numeric"
          autoComplete="cc-csc"
          placeholder="123"
          maxLength={4}
          registration={form.register('cvc')}
          error={errors.cvc?.message}
        />
      </div>
      <h3 className="pt-2 text-base font-bold text-foreground">{PAYMENT_TEXT.billingTitle}</h3>
      <PaymentField
        label="Adresă"
        autoComplete="street-address"
        placeholder="Str. Exemplului, nr. 12"
        registration={form.register('address')}
        error={errors.address?.message}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <PaymentField
          label="Localitate"
          autoComplete="address-level2"
          placeholder="Cluj-Napoca"
          registration={form.register('city')}
          error={errors.city?.message}
        />
        <PaymentField
          label="Cod poștal"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="400000"
          maxLength={6}
          registration={form.register('postalCode')}
          error={errors.postalCode?.message}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="payment-country" className="text-xs font-semibold text-foreground">
          Țară
        </label>
        <select
          id="payment-country"
          autoComplete="country"
          className={BOOKING_INPUT_CLASS}
          {...form.register('country')}
        >
          {COUNTRY_OPTIONS.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="flex items-start gap-2 text-xs text-foreground">
          <input
            type="checkbox"
            aria-invalid={Boolean(errors.acceptTerms) || undefined}
            aria-describedby={errors.acceptTerms ? 'terms-error' : undefined}
            className="mt-0.5 size-4 accent-primary"
            {...form.register('acceptTerms')}
          />
          {PAYMENT_TEXT.terms}
        </label>
        {errors.acceptTerms && (
          <p id="terms-error" className="text-xs font-medium text-destructive">
            {errors.acceptTerms.message}
          </p>
        )}
      </div>
      <button type="submit" className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}>
        {PAYMENT_TEXT.pay(amount)}
      </button>
      <p className="text-[11px] text-muted-foreground">{PAYMENT_TEXT.cardNote}</p>
      {backLink}
    </form>
  )
}
