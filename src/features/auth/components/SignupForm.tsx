import { Controller } from 'react-hook-form'
import { Button } from '@/components/ui'
import { cn } from 'cn'
import { AUTH_DENSITY_STYLES, AUTH_SUBMIT_BASE_CLASS, SIGNUP_TEXT } from '../constants'
import { useSignupForm } from '../hooks'
import { AuthCheckboxField } from './AuthCheckboxField'
import { AuthDivider } from './AuthDivider'
import { AuthPasswordField } from './AuthPasswordField'
import { AuthTextField } from './AuthTextField'
import { GoogleAuthButton } from './GoogleAuthButton'
import { SignupCardFooter } from './SignupCardFooter'
import { SignupTermsText } from './SignupTermsText'

export function SignupForm() {
  const { form, submit, logCurrentValues } = useSignupForm()
  const { errors } = form.formState
  const styles = AUTH_DENSITY_STYLES.regular

  return (
    <div className="space-y-5">
      <GoogleAuthButton
        label={SIGNUP_TEXT.google}
        hasIcon={false}
        onClick={() => logCurrentValues('google')}
      />
      <AuthDivider />

      <form onSubmit={(event) => void submit(event)} noValidate className={styles.stack}>
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

        <div className="space-y-3 pt-0.5">
          <Controller
            control={form.control}
            name="isAgeConfirmed"
            render={({ field }) => (
              <AuthCheckboxField
                checked={field.value}
                onCheckedChange={field.onChange}
                onBlur={field.onBlur}
                inputRef={field.ref}
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
                onBlur={field.onBlur}
                inputRef={field.ref}
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

        <Button type="submit" className={cn(AUTH_SUBMIT_BASE_CLASS, styles.submit)}>
          {SIGNUP_TEXT.submit}
        </Button>
      </form>

      <SignupCardFooter onLoginClick={() => logCurrentValues('login-link')} />
    </div>
  )
}
