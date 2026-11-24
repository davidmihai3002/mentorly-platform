import { useId } from 'react'
import { DemoActionDialog } from '@/components'
import { Button } from '@/components/ui'
import { cn } from 'cn'
import { ROUTES } from '@/constants'
import { AUTH_DENSITY_STYLES, AUTH_SUBMIT_BASE_CLASS, LOGIN_TEXT } from '../constants'
import { useLoginForm } from '../hooks'
import { AuthCardFooter } from './AuthCardFooter'
import { AuthDivider } from './AuthDivider'
import { AuthFieldError } from './AuthFieldError'
import { AuthPasswordField } from './AuthPasswordField'
import { AuthTextField } from './AuthTextField'
import { GoogleAuthButton } from './GoogleAuthButton'

export function LoginForm() {
  const { form, submit } = useLoginForm()
  const { errors, isSubmitting } = form.formState
  const formErrorId = useId()
  const styles = AUTH_DENSITY_STYLES.compact

  return (
    <div className={styles.stack}>
      <DemoActionDialog trigger={<GoogleAuthButton density="compact" />} />
      <AuthDivider density="compact" />

      <form onSubmit={(event) => void submit(event)} noValidate className={styles.stack}>
        <AuthTextField
          density="compact"
          label={LOGIN_TEXT.emailLabel}
          type="email"
          placeholder={LOGIN_TEXT.emailPlaceholder}
          autoComplete="username"
          error={errors.email?.message}
          registration={form.register('email')}
        />

        <AuthPasswordField
          density="compact"
          error={errors.password?.message}
          registration={form.register('password')}
          forgotPasswordHref={ROUTES.forgotPassword}
        />

        <AuthFieldError id={formErrorId} message={errors.root?.message} />

        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(AUTH_SUBMIT_BASE_CLASS, styles.submit)}
        >
          {LOGIN_TEXT.submit}
        </Button>
      </form>

      <AuthCardFooter />
    </div>
  )
}
