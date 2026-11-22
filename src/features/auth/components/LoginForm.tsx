import { Button } from '@/components/ui'
import { AUTH_SUBMIT_CLASS, LOGIN_TEXT } from '../constants'
import { useLoginForm } from '../hooks'
import { AuthCardFooter } from './AuthCardFooter'
import { AuthDivider } from './AuthDivider'
import { AuthPasswordField } from './AuthPasswordField'
import { AuthTextField } from './AuthTextField'
import { GoogleAuthButton } from './GoogleAuthButton'

export function LoginForm() {
  const { form, submit, logCurrentValues } = useLoginForm()
  const { errors } = form.formState

  return (
    <div className="space-y-3">
      <GoogleAuthButton onClick={() => logCurrentValues('google')} />
      <AuthDivider />

      <form onSubmit={(event) => void submit(event)} noValidate className="space-y-3">
        <AuthTextField
          label={LOGIN_TEXT.emailLabel}
          type="email"
          placeholder={LOGIN_TEXT.emailPlaceholder}
          autoComplete="username"
          error={errors.email?.message}
          registration={form.register('email')}
        />

        <AuthPasswordField
          error={errors.password?.message}
          registration={form.register('password')}
          onForgotPassword={() => logCurrentValues('forgot-password')}
        />

        <Button type="submit" className={AUTH_SUBMIT_CLASS}>
          {LOGIN_TEXT.submit}
        </Button>
      </form>

      <AuthCardFooter onRegisterClick={() => logCurrentValues('register-mentee')} />
    </div>
  )
}
