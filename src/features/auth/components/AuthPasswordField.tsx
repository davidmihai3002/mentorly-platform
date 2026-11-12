import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { Button, Input, Label } from '@/components/ui'
import { LOGIN_TEXT } from '../constants'
import { usePasswordVisibility } from '../hooks'

type AuthPasswordFieldProps = {
  label?: string
  autoComplete?: string
  error?: string
  registration: UseFormRegisterReturn
  onForgotPassword?: () => void
  forgotPasswordLabel?: string
}

export function AuthPasswordField({
  label = LOGIN_TEXT.passwordLabel,
  autoComplete = 'current-password',
  error,
  registration,
  onForgotPassword,
  forgotPasswordLabel = LOGIN_TEXT.forgotPassword,
}: AuthPasswordFieldProps) {
  const fieldId = useId()
  const errorId = `${fieldId}-error`
  const { isVisible, toggleVisibility, inputType, toggleLabel } = usePasswordVisibility()

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={fieldId}>{label}</Label>
        {onForgotPassword && (
          <Button
            type="button"
            variant="link"
            className="h-auto p-0 text-xs font-medium text-primary"
            onClick={onForgotPassword}
          >
            {forgotPasswordLabel}
          </Button>
        )}
      </div>

      <div className="relative">
        <Input
          id={fieldId}
          type={inputType}
          required
          autoComplete={autoComplete}
          className="h-10 rounded-lg bg-card pr-10 pl-3 text-sm"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...registration}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={toggleLabel}
          className="absolute top-1/2 right-1.5 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-foreground"
          onClick={toggleVisibility}
        >
          {isVisible ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
        </Button>
      </div>

      {error && (
        <p id={errorId} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
