import { useId } from 'react'
import { Button, Input, Label } from '@/components/ui'
import { LOGIN_TEXT } from '../constants'
import { useLoginForm } from '../hooks'

/** Formularul de login. Până la backend, butoanele afișează în consolă datele (parola mascată). */
export function LoginForm() {
  const { form, submit, logCurrentValues, errorSummary } = useLoginForm()
  const { errors } = form.formState
  const id = useId()
  const emailId = `${id}-email`
  const passwordId = `${id}-password`

  return (
    <div className="space-y-6">
      {/* Anunță erorile și când formularul e trimis cu Enter (focusul nu se mută). */}
      <p role="status" aria-live="polite" className="sr-only">
        {errorSummary}
      </p>

      <form onSubmit={(event) => void submit(event)} noValidate className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor={emailId}>{LOGIN_TEXT.emailLabel}</Label>
          <Input
            id={emailId}
            type="email"
            required
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            placeholder={LOGIN_TEXT.emailPlaceholder}
            className="h-11"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            {...form.register('email')}
          />
          {errors.email && (
            <p id={`${emailId}-error`} className="text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor={passwordId}>{LOGIN_TEXT.passwordLabel}</Label>
            <Button
              type="button"
              variant="link"
              className="h-auto min-h-6 p-0 text-sm"
              onClick={() => logCurrentValues('forgot-password')}
            >
              {LOGIN_TEXT.forgotPassword}
            </Button>
          </div>
          <Input
            id={passwordId}
            type="password"
            required
            autoComplete="current-password"
            className="h-11"
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? `${passwordId}-error` : undefined}
            {...form.register('password')}
          />
          {errors.password && (
            <p id={`${passwordId}-error`} className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="h-auto min-h-11 w-full rounded-full text-base font-semibold whitespace-normal shadow-sm"
        >
          {LOGIN_TEXT.submit}
        </Button>
      </form>

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        {LOGIN_TEXT.divider}
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-auto min-h-11 w-full rounded-full text-base whitespace-normal"
        onClick={() => logCurrentValues('google')}
      >
        {LOGIN_TEXT.google}
      </Button>

      <div className="space-y-1 text-center text-sm">
        <p className="text-muted-foreground">{LOGIN_TEXT.noAccount}</p>
        <div className="flex flex-wrap justify-center gap-x-4">
          <Button
            type="button"
            variant="link"
            className="h-auto min-h-11 font-semibold whitespace-normal"
            onClick={() => logCurrentValues('register-mentee')}
          >
            {LOGIN_TEXT.registerMentee}
          </Button>
          <Button
            type="button"
            variant="link"
            className="h-auto min-h-11 font-semibold whitespace-normal"
            onClick={() => logCurrentValues('register-mentor')}
          >
            {LOGIN_TEXT.registerMentor}
          </Button>
        </div>
      </div>
    </div>
  )
}
