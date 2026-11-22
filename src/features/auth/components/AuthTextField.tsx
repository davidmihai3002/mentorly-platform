import { useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { Input, Label } from '@/components/ui'
import { AUTH_INPUT_CLASS } from '../constants'
import { AuthFieldError } from './AuthFieldError'

type AuthTextFieldProps = {
  label: string
  type?: 'text' | 'email'
  placeholder?: string
  autoComplete?: string
  error?: string
  registration: UseFormRegisterReturn
}

export function AuthTextField({
  label,
  type = 'text',
  placeholder,
  autoComplete,
  error,
  registration,
}: AuthTextFieldProps) {
  const fieldId = useId()
  const errorId = `${fieldId}-error`

  return (
    <div className="flex flex-col gap-0.5">
      <Label htmlFor={fieldId}>{label}</Label>
      <Input
        id={fieldId}
        type={type}
        required
        autoComplete={autoComplete}
        autoCapitalize={type === 'email' ? 'none' : undefined}
        spellCheck={type === 'email' ? false : undefined}
        placeholder={placeholder}
        className={AUTH_INPUT_CLASS}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...registration}
      />
      <AuthFieldError id={errorId} message={error} />
    </div>
  )
}
