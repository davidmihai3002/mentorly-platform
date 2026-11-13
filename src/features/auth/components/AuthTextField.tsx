import { useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { Input, Label } from '@/components/ui'

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
    <div className="space-y-1.5">
      <Label htmlFor={fieldId}>{label}</Label>
      <Input
        id={fieldId}
        type={type}
        required
        autoComplete={autoComplete}
        autoCapitalize={type === 'email' ? 'none' : undefined}
        spellCheck={type === 'email' ? false : undefined}
        placeholder={placeholder}
        className="h-10 rounded-lg bg-card px-3 text-sm"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...registration}
      />
      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
