import { cn } from 'cn'
import type { UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui'
import { ROUTES } from '@/constants'
import { AUTH_DENSITY_STYLES, AUTH_SUBMIT_BASE_CLASS, MENTOR_SIGNUP_TEXT } from '../constants'
import type { LoginFormInput, LoginFormOutput } from '../types'
import { AuthPasswordField } from './AuthPasswordField'
import { AuthTextField } from './AuthTextField'

type MentorSignupFormProps = {
  form: UseFormReturn<LoginFormInput, unknown, LoginFormOutput>
  onSubmit: () => void
  onLinkedIn: () => void
  documentsErrorId?: string
}

export function MentorSignupForm({
  form,
  onSubmit,
  onLinkedIn,
  documentsErrorId,
}: MentorSignupFormProps) {
  const { errors } = form.formState
  const styles = AUTH_DENSITY_STYLES.compact

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
      noValidate
      aria-describedby={documentsErrorId}
      className={styles.stack}
    >
      <AuthTextField
        density="compact"
        label={MENTOR_SIGNUP_TEXT.emailLabel}
        type="email"
        placeholder={MENTOR_SIGNUP_TEXT.emailPlaceholder}
        autoComplete="email"
        error={errors.email?.message}
        registration={form.register('email')}
      />
      <AuthPasswordField
        density="compact"
        label={MENTOR_SIGNUP_TEXT.passwordLabel}
        autoComplete="new-password"
        error={errors.password?.message}
        registration={form.register('password')}
        forgotPasswordHref={ROUTES.forgotPassword}
      />
      <Button type="submit" className={cn(AUTH_SUBMIT_BASE_CLASS, styles.submit, 'rounded-full')}>
        {MENTOR_SIGNUP_TEXT.submit}
      </Button>
      <button
        type="button"
        onClick={onLinkedIn}
        className="w-full rounded-sm text-center text-[13px] text-foreground hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
      >
        {MENTOR_SIGNUP_TEXT.linkedin}
      </button>
    </form>
  )
}
