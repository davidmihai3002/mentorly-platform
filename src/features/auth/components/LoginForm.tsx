import { Button } from '@/components/ui'
import { LOGIN_TEXT } from '../constants'
import { useLoginForm } from '../hooks'
import { AuthCardFooter } from './AuthCardFooter'
import { AuthDivider } from './AuthDivider'
import { AuthPasswordField } from './AuthPasswordField'
import { AuthTextField } from './AuthTextField'
import { GoogleAuthButton } from './GoogleAuthButton'

type LoginFormProps = {
  onNavigateToSignup?: () => void
}

export function LoginForm({ onNavigateToSignup }: LoginFormProps) {
  const { form, submit, logCurrentValues } = useLoginForm()
  const { errors } = form.formState

  const handleRegisterClick = () => {
    logCurrentValues('register-mentee')
    onNavigateToSignup?.()
  }

  return (
    <div className="space-y-4">
      <GoogleAuthButton onClick={() => logCurrentValues('google')} />
      <AuthDivider />

      <form onSubmit={(event) => void submit(event)} noValidate className="space-y-4">
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

        <Button
          type="submit"
          className="h-10 w-full rounded-lg bg-brand-navy text-sm font-semibold text-brand-navy-foreground shadow-xs hover:bg-brand-navy/90"
        >
          {LOGIN_TEXT.submit}
        </Button>
      </form>

      <AuthCardFooter onRegisterClick={handleRegisterClick} />
    </div>
  )
}
