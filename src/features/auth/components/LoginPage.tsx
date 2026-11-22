import { LOGIN_TEXT } from '../constants'
import { AuthCard } from './AuthCard'
import { AuthCardHeader } from './AuthCardHeader'
import { LoginForm } from './LoginForm'

export function LoginPage() {
  return (
    <>
      <title>{LOGIN_TEXT.pageTitle}</title>
      <AuthCard density="compact">
        <AuthCardHeader title={LOGIN_TEXT.title} />
        <LoginForm />
      </AuthCard>
    </>
  )
}
