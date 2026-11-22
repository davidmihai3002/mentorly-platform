import { useLocation } from 'react-router'
import { LOGIN_TEXT } from '../constants'
import { isLoggedOutState } from '../utils'
import { AuthCard } from './AuthCard'
import { AuthCardHeader } from './AuthCardHeader'
import { AuthNotice } from './AuthNotice'
import { LoginForm } from './LoginForm'

export function LoginPage() {
  const { state } = useLocation()

  return (
    <>
      <title>{LOGIN_TEXT.pageTitle}</title>
      <AuthCard density="compact">
        <AuthCardHeader title={LOGIN_TEXT.title} />
        {isLoggedOutState(state) && <AuthNotice>{LOGIN_TEXT.loggedOut}</AuthNotice>}
        <LoginForm />
      </AuthCard>
    </>
  )
}
