import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { AppLink } from '@/components/navigation'
import { Button, Input, Label } from '@/components/ui'
import { cn } from 'cn'
import { AUTH_DENSITY_STYLES, AUTH_INPUT_BASE_CLASS, LOGIN_TEXT } from '../constants'
import { usePasswordVisibility } from '../hooks'
import type { AuthDensity } from '../types'
import { AuthFieldError } from './AuthFieldError'

type AuthPasswordFieldProps = {
  label?: string
  placeholder?: string
  helperText?: string
  autoComplete?: string
  error?: string
  registration: UseFormRegisterReturn
  onForgotPassword?: () => void
  forgotPasswordHref?: string
  forgotPasswordLabel?: string
  density?: AuthDensity
}

export function AuthPasswordField({
  label = LOGIN_TEXT.passwordLabel,
  placeholder,
  helperText,
  autoComplete = 'current-password',
  error,
  registration,
  onForgotPassword,
  forgotPasswordHref,
  forgotPasswordLabel = LOGIN_TEXT.forgotPassword,
  density = 'regular',
}: AuthPasswordFieldProps) {
  const styles = AUTH_DENSITY_STYLES[density]
  const fieldId = useId()
  const helperId = `${fieldId}-helper`
  const errorId = `${fieldId}-error`
  const describedBy =
    [helperText ? helperId : undefined, error ? errorId : undefined].filter(Boolean).join(' ') ||
    undefined
  const { isVisible, toggleVisibility, inputType, toggleLabel } = usePasswordVisibility()

  return (
    <div className={cn('flex flex-col', styles.field)}>
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={fieldId}>{label}</Label>
        {forgotPasswordHref && (
          <AppLink
            to={forgotPasswordHref}
            onClick={onForgotPassword}
            className="rounded-sm text-[13px] font-medium text-link hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
          >
            {forgotPasswordLabel}
          </AppLink>
        )}
      </div>

      <div className="relative">
        <Input
          id={fieldId}
          type={inputType}
          placeholder={placeholder}
          required
          autoComplete={autoComplete}
          className={cn(AUTH_INPUT_BASE_CLASS, styles.input, 'pr-9')}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...registration}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`${toggleLabel} (${label})`}
          className="absolute top-1/2 right-1 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground"
          onClick={toggleVisibility}
        >
          {isVisible ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
        </Button>
      </div>

      {helperText && (
        <p id={helperId} className="text-xs text-muted-foreground">
          {helperText}
        </p>
      )}

      <AuthFieldError id={errorId} message={error} />
    </div>
  )
}
