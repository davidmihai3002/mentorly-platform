import { cn } from 'cn'
import { Button } from '@/components/ui'
import { AUTH_DENSITY_STYLES, AUTH_SUBMIT_BASE_CLASS, RESET_PASSWORD_TEXT } from '../constants'
import { useResetPasswordForm } from '../hooks'
import { AuthBackLink } from './AuthBackLink'
import { AuthNotice } from './AuthNotice'
import { AuthPasswordField } from './AuthPasswordField'

export function ResetPasswordForm() {
  const { form, submit, isSaved } = useResetPasswordForm()
  const { errors } = form.formState
  const styles = AUTH_DENSITY_STYLES.compact

  if (isSaved) {
    return (
      <div className={styles.stack}>
        <AuthNotice>{RESET_PASSWORD_TEXT.saved}</AuthNotice>
        <AuthBackLink label={RESET_PASSWORD_TEXT.goToLogin} />
      </div>
    )
  }

  return (
    <form onSubmit={(event) => void submit(event)} noValidate className={styles.stack}>
      <AuthPasswordField
        density="compact"
        label={RESET_PASSWORD_TEXT.passwordLabel}
        placeholder={RESET_PASSWORD_TEXT.passwordPlaceholder}
        helperText={RESET_PASSWORD_TEXT.passwordHelper}
        autoComplete="new-password"
        error={errors.password?.message}
        registration={form.register('password')}
      />
      <AuthPasswordField
        density="compact"
        label={RESET_PASSWORD_TEXT.confirmLabel}
        placeholder={RESET_PASSWORD_TEXT.confirmPlaceholder}
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        registration={form.register('confirmPassword')}
      />
      <Button type="submit" className={cn(AUTH_SUBMIT_BASE_CLASS, styles.submit)}>
        {RESET_PASSWORD_TEXT.submit}
      </Button>
      <AuthBackLink label={RESET_PASSWORD_TEXT.backToLogin} />
    </form>
  )
}
