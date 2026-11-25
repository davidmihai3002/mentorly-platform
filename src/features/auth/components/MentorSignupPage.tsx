import { MENTOR_SIGNUP_TEXT } from '../constants'
import { AuthCard } from './AuthCard'
import { AuthCardHeader } from './AuthCardHeader'
import { SignupForm } from './SignupForm'

export function MentorSignupPage() {
  return (
    <>
      <title>{MENTOR_SIGNUP_TEXT.pageTitle}</title>
      <AuthCard density="regular">
        <AuthCardHeader title={MENTOR_SIGNUP_TEXT.title} subtitle={MENTOR_SIGNUP_TEXT.subtitle} />
        <SignupForm role="MENTOR" />
      </AuthCard>
    </>
  )
}
