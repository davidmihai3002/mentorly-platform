import { SIGNUP_TEXT } from '../constants'
import { AuthCardHeader } from './AuthCardHeader'
import { SignupForm } from './SignupForm'

export function SignupPage() {
  return (
    <>
      <title>{SIGNUP_TEXT.pageTitle}</title>
      <AuthCardHeader title={SIGNUP_TEXT.title} subtitle={SIGNUP_TEXT.subtitle} />
      <SignupForm />
    </>
  )
}
