import { cn } from 'cn'
import { useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { Label } from '@/components/ui'
import { AUTH_DENSITY_STYLES, AUTH_INPUT_BASE_CLASS } from '../constants'
import { AuthFieldError } from './AuthFieldError'

type MotivationFieldProps = {
  label: string
  error?: string
  registration: UseFormRegisterReturn
}

export function MotivationField({ label, error, registration }: MotivationFieldProps) {
  const fieldId = useId()
  const errorId = `${fieldId}-error`

  return (
    <div className={cn('flex flex-col', AUTH_DENSITY_STYLES.regular.field)}>
      <Label htmlFor={fieldId}>{label}</Label>
      <textarea
        id={fieldId}
        required
        rows={5}
        className={cn(
          AUTH_INPUT_BASE_CLASS,
          'min-h-24 w-full resize-y border px-3 py-2 text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...registration}
      />
      <AuthFieldError id={errorId} message={error} />
    </div>
  )
}
