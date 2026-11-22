import { LOGIN_TEXT } from '../constants'
import { useLogoutNotice } from '../hooks'
import { AuthCard } from './AuthCard'
import { AuthCardHeader } from './AuthCardHeader'
import { AuthNotice } from './AuthNotice'
import { LoginForm } from './LoginForm'

export function LoginPage() {
  const hasLoggedOut = useLogoutNotice()

  return (
    <>
      <title>{LOGIN_TEXT.pageTitle}</title>
      <AuthCard density="compact">
        <AuthCardHeader title={LOGIN_TEXT.title} />
        {hasLoggedOut && <AuthNotice>{LOGIN_TEXT.loggedOut}</AuthNotice>}
        <LoginForm />
      </AuthCard>
    </>
  )
}
