import { LOGIN_TEXT } from '../constants'
import { AuthCardHeader } from './AuthCardHeader'
import { LoginForm } from './LoginForm'

export function LoginPage() {
  return (
    <>
      <title>{LOGIN_TEXT.pageTitle}</title>
      <AuthCardHeader title={LOGIN_TEXT.title} />
      <LoginForm />
    </>
  )
}
