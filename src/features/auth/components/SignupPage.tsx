import { SIGNUP_TEXT } from '../constants'
import { AuthCard } from './AuthCard'
import { AuthCardHeader } from './AuthCardHeader'
import { SignupForm } from './SignupForm'

export function SignupPage() {
  return (
    <>
      <title>{SIGNUP_TEXT.pageTitle}</title>
      <AuthCard density="regular">
        <AuthCardHeader title={SIGNUP_TEXT.title} subtitle={SIGNUP_TEXT.subtitle} />
        <SignupForm role="MENTEE" />
      </AuthCard>
    </>
  )
}
