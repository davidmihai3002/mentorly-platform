import { useId } from 'react'
import { Controller } from 'react-hook-form'
import { DemoActionDialog } from '@/components'
import { Button } from '@/components/ui'
import { cn } from 'cn'
import { AUTH_DENSITY_STYLES, AUTH_SUBMIT_BASE_CLASS, SIGNUP_TEXT } from '../constants'
import { useSignupForm } from '../hooks'
import { AuthCheckboxField } from './AuthCheckboxField'
import { AuthDivider } from './AuthDivider'
import { AuthFieldError } from './AuthFieldError'
import { AuthPasswordField } from './AuthPasswordField'
import { AuthTextField } from './AuthTextField'
import { GoogleAuthButton } from './GoogleAuthButton'
import { SignupCardFooter } from './SignupCardFooter'
import { SignupTermsText } from './SignupTermsText'

export function SignupForm() {
  const { form, submit } = useSignupForm()
  const { errors, isSubmitting } = form.formState
  const formErrorId = useId()
  const styles = AUTH_DENSITY_STYLES.regular

  return (
    <div className="space-y-5">
      <DemoActionDialog trigger={<GoogleAuthButton label={SIGNUP_TEXT.google} hasIcon={false} />} />
      <AuthDivider />

      <form onSubmit={(event) => void submit(event)} noValidate className={styles.stack}>
        <AuthTextField
          label={SIGNUP_TEXT.firstNameLabel}
          type="text"
          placeholder={SIGNUP_TEXT.firstNamePlaceholder}
          autoComplete="given-name"
          error={errors.firstName?.message}
          registration={form.register('firstName')}
        />

        <AuthTextField
          label={SIGNUP_TEXT.lastNameLabel}
          type="text"
          placeholder={SIGNUP_TEXT.lastNamePlaceholder}
          autoComplete="family-name"
          error={errors.lastName?.message}
          registration={form.register('lastName')}
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

        <AuthTextField
          label={SIGNUP_TEXT.birthDateLabel}
          type="date"
          autoComplete="bday"
          error={errors.birthDate?.message}
          registration={form.register('birthDate')}
        />

        <div className="space-y-3 pt-0.5">
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
                <SignupTermsText />
              </AuthCheckboxField>
            )}
          />
        </div>

        <AuthFieldError id={formErrorId} message={errors.root?.message} />

        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(AUTH_SUBMIT_BASE_CLASS, styles.submit)}
        >
          {SIGNUP_TEXT.submit}
        </Button>
      </form>

      <SignupCardFooter />
    </div>
  )
}
