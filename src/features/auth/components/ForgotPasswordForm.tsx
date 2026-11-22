import { cn } from 'cn'
import { Button } from '@/components/ui'
import { AUTH_DENSITY_STYLES, AUTH_SUBMIT_BASE_CLASS, FORGOT_PASSWORD_TEXT } from '../constants'
import { useForgotPasswordForm } from '../hooks'
import { AuthBackLink } from './AuthBackLink'
import { AuthNotice } from './AuthNotice'
import { AuthTextField } from './AuthTextField'

export function ForgotPasswordForm() {
  const { form, submit, isSent } = useForgotPasswordForm()
  const styles = AUTH_DENSITY_STYLES.compact

  return (
    <div className={styles.stack}>
      {isSent ? (
        <AuthNotice>{FORGOT_PASSWORD_TEXT.sent}</AuthNotice>
      ) : (
        <form onSubmit={(event) => void submit(event)} noValidate className={styles.stack}>
          <AuthTextField
            density="compact"
            label={FORGOT_PASSWORD_TEXT.emailLabel}
            type="email"
            placeholder={FORGOT_PASSWORD_TEXT.emailPlaceholder}
            autoComplete="email"
            error={form.formState.errors.email?.message}
            registration={form.register('email')}
          />
          <Button type="submit" className={cn(AUTH_SUBMIT_BASE_CLASS, styles.submit)}>
            {FORGOT_PASSWORD_TEXT.submit}
          </Button>
        </form>
      )}
      <AuthBackLink label={FORGOT_PASSWORD_TEXT.backToLogin} />
    </div>
  )
}
