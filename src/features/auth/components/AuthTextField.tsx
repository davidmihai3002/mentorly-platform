import { useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { Input, Label } from '@/components/ui'
import { cn } from 'cn'
import { AUTH_DENSITY_STYLES, AUTH_INPUT_BASE_CLASS } from '../constants'
import type { AuthDensity } from '../types'
import { AuthFieldError } from './AuthFieldError'

type AuthTextFieldProps = {
  label: string
  type?: 'text' | 'email' | 'date' | 'url'
  placeholder?: string
  helperText?: string
  autoComplete?: string
  error?: string
  registration: UseFormRegisterReturn
  density?: AuthDensity
}

export function AuthTextField({
  label,
  type = 'text',
  placeholder,
  helperText,
  autoComplete,
  error,
  registration,
  density = 'regular',
}: AuthTextFieldProps) {
  const styles = AUTH_DENSITY_STYLES[density]
  const fieldId = useId()
  const helperId = `${fieldId}-helper`
  const errorId = `${fieldId}-error`
  const describedBy =
    [helperText ? helperId : undefined, error ? errorId : undefined].filter(Boolean).join(' ') ||
    undefined

  return (
    <div className={cn('flex flex-col', styles.field)}>
      <Label htmlFor={fieldId}>{label}</Label>
      <Input
        id={fieldId}
        type={type}
        required
        autoComplete={autoComplete}
        autoCapitalize={type === 'email' ? 'none' : undefined}
        spellCheck={type === 'email' ? false : undefined}
        placeholder={placeholder}
        className={cn(AUTH_INPUT_BASE_CLASS, styles.input)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...registration}
      />
      {helperText && (
        <p id={helperId} className="text-xs text-muted-foreground">
          {helperText}
        </p>
      )}
      <AuthFieldError id={errorId} message={error} />
    </div>
  )
}
