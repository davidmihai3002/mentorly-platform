import { RESET_PASSWORD_TEXT } from '../constants'
import { AuthCard } from './AuthCard'
import { AuthCardHeader } from './AuthCardHeader'
import { ResetPasswordForm } from './ResetPasswordForm'

export function ResetPasswordPage() {
  return (
    <>
      <title>{RESET_PASSWORD_TEXT.pageTitle}</title>
      <AuthCard density="compact">
        <AuthCardHeader title={RESET_PASSWORD_TEXT.title} subtitle={RESET_PASSWORD_TEXT.subtitle} />
        <ResetPasswordForm />
      </AuthCard>
    </>
  )
}
