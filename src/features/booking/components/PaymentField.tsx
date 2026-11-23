import { cn } from 'cn'
import { useId, type InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { BOOKING_INPUT_CLASS } from '../constants'

type PaymentFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  registration: UseFormRegisterReturn
  error?: string
}

export function PaymentField({
  label,
  registration,
  error,
  className,
  ...inputProps
}: PaymentFieldProps) {
  const id = useId()
  const errorId = useId()

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-xs font-semibold text-foreground">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? errorId : undefined}
        className={BOOKING_INPUT_CLASS}
        {...inputProps}
        {...registration}
      />
      {error && (
        <p id={errorId} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
