import { FORGOT_PASSWORD_TEXT } from '../constants'
import { AuthCard } from './AuthCard'
import { AuthCardHeader } from './AuthCardHeader'
import { ForgotPasswordForm } from './ForgotPasswordForm'

export function ForgotPasswordPage() {
  return (
    <>
      <title>{FORGOT_PASSWORD_TEXT.pageTitle}</title>
      <AuthCard density="compact">
        <AuthCardHeader
          title={FORGOT_PASSWORD_TEXT.title}
          subtitle={FORGOT_PASSWORD_TEXT.subtitle}
        />
        <ForgotPasswordForm />
      </AuthCard>
    </>
  )
}
