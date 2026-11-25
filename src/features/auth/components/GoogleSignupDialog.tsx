import { cn } from 'cn'
import { useId } from 'react'
import { Controller } from 'react-hook-form'
import type { UserRole } from '@/api'
import { InfoDialog, OptionCard, OptionGroup } from '@/components'
import { Button } from '@/components/ui'
import {
  AUTH_DENSITY_STYLES,
  AUTH_SUBMIT_BASE_CLASS,
  GOOGLE_SIGNUP_TEXT,
  SIGNUP_TEXT,
} from '../constants'
import { useGoogleSignupForm } from '../hooks'
import { AuthCheckboxField } from './AuthCheckboxField'
import { AuthFieldError } from './AuthFieldError'
import { AuthTextField } from './AuthTextField'
import { SignupTermsText } from './SignupTermsText'

type GoogleSignupDialogProps = {
  idToken: string
  defaultRole: UserRole
  onClose: () => void
}

export function GoogleSignupDialog({ idToken, defaultRole, onClose }: GoogleSignupDialogProps) {
  const { form, submit } = useGoogleSignupForm(idToken, defaultRole)
  const { errors, isSubmitting } = form.formState
  const formErrorId = useId()
  const styles = AUTH_DENSITY_STYLES.regular

  return (
    <InfoDialog
      title={GOOGLE_SIGNUP_TEXT.title}
      open
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
    >
      <form onSubmit={(event) => void submit(event)} noValidate className={styles.stack}>
        <Controller
          control={form.control}
          name="role"
          render={({ field }) => (
            <OptionGroup legend={GOOGLE_SIGNUP_TEXT.roleLegend}>
              {GOOGLE_SIGNUP_TEXT.roles.map((role) => (
                <OptionCard
                  key={role.value}
                  name={field.name}
                  value={role.value}
                  title={role.label}
                  checked={field.value === role.value}
                  onChange={() => field.onChange(role.value)}
                />
              ))}
            </OptionGroup>
          )}
        />

        <AuthTextField
          label={SIGNUP_TEXT.birthDateLabel}
          type="date"
          autoComplete="bday"
          error={errors.birthDate?.message}
          registration={form.register('birthDate')}
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
              <SignupTermsText />
            </AuthCheckboxField>
          )}
        />

        <AuthFieldError id={formErrorId} message={errors.root?.message} />

        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(AUTH_SUBMIT_BASE_CLASS, styles.submit)}
        >
          {GOOGLE_SIGNUP_TEXT.submit}
        </Button>
      </form>
    </InfoDialog>
  )
}
