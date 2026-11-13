import { Controller } from 'react-hook-form'
import { Button } from '@/components/ui'
import { SIGNUP_TEXT } from '../constants'
import { useSignupForm } from '../hooks'
import { AuthCheckboxField } from './AuthCheckboxField'
import { AuthDivider } from './AuthDivider'
import { AuthPasswordField } from './AuthPasswordField'
import { AuthTextField } from './AuthTextField'
import { GoogleAuthButton } from './GoogleAuthButton'
import { SignupCardFooter } from './SignupCardFooter'
import { SignupTermsText } from './SignupTermsText'

type SignupFormProps = {
  onNavigateToLogin?: () => void
}

export function SignupForm({ onNavigateToLogin }: SignupFormProps) {
  const { form, submit, logCurrentValues } = useSignupForm()
  const { errors } = form.formState

  const handleLoginClick = () => {
    logCurrentValues('login-link')
    onNavigateToLogin?.()
  }

  return (
    <div className="space-y-4">
      <GoogleAuthButton label={SIGNUP_TEXT.google} onClick={() => logCurrentValues('google')} />
      <AuthDivider />

      <form onSubmit={(event) => void submit(event)} noValidate className="space-y-4">
        <AuthTextField
          label={SIGNUP_TEXT.fullNameLabel}
          type="text"
          placeholder={SIGNUP_TEXT.fullNamePlaceholder}
          autoComplete="name"
          error={errors.fullName?.message}
          registration={form.register('fullName')}
        />

        <AuthTextField
          label={SIGNUP_TEXT.emailLabel}
          type="email"
          placeholder={SIGNUP_TEXT.emailPlaceholder}
          autoComplete="email"
          error={errors.email?.message}
          registration={form.register('email')}
        />

        <AuthPasswordField
          label={SIGNUP_TEXT.passwordLabel}
          placeholder={SIGNUP_TEXT.passwordPlaceholder}
          helperText={SIGNUP_TEXT.passwordHelper}
          autoComplete="new-password"
          error={errors.password?.message}
          registration={form.register('password')}
        />

        <AuthPasswordField
          label={SIGNUP_TEXT.confirmPasswordLabel}
          placeholder={SIGNUP_TEXT.confirmPasswordPlaceholder}
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          registration={form.register('confirmPassword')}
        />

        <div className="space-y-2.5 pt-0.5">
          <Controller
            control={form.control}
            name="isAgeConfirmed"
            render={({ field }) => (
              <AuthCheckboxField
                checked={field.value}
                onCheckedChange={field.onChange}
                error={errors.isAgeConfirmed?.message}
              >
                {SIGNUP_TEXT.ageConfirmationLabel}
              </AuthCheckboxField>
            )}
          />

          <Controller
            control={form.control}
            name="isTermsAccepted"
            render={({ field }) => (
              <AuthCheckboxField
                checked={field.value}
                onCheckedChange={field.onChange}
                error={errors.isTermsAccepted?.message}
              >
                <SignupTermsText
                  onTermsClick={() => logCurrentValues('terms')}
                  onPrivacyClick={() => logCurrentValues('privacy-policy')}
                />
              </AuthCheckboxField>
            )}
          />
        </div>

        <Button
          type="submit"
          className="h-10 w-full rounded-lg bg-brand-navy text-sm font-semibold text-brand-navy-foreground shadow-xs hover:bg-brand-navy/90"
        >
          {SIGNUP_TEXT.submit}
        </Button>
      </form>

      <SignupCardFooter onLoginClick={handleLoginClick} />
    </div>
  )
}
