import { LOGIN_TEXT } from '../constants'
import { logLoginAction } from '../utils'
import { AuthBackdrop } from './AuthBackdrop'
import { AuthCardHeader } from './AuthCardHeader'
import { AuthNavbar } from './AuthNavbar'
import { LoginForm } from './LoginForm'

export function LoginPage() {
  const logNavAction = (action: 'nav-login' | 'nav-register') => {
    logLoginAction(action, { email: '', password: '' })
  }

  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <title>{LOGIN_TEXT.pageTitle}</title>
      <AuthBackdrop />
      <AuthNavbar
        onLoginClick={() => logNavAction('nav-login')}
        onRegisterClick={() => logNavAction('nav-register')}
      />

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-[420px] space-y-5 rounded-2xl border border-border/80 bg-card p-6 shadow-lg sm:p-8">
          <AuthCardHeader title={LOGIN_TEXT.title} subtitle={LOGIN_TEXT.subtitle} />
          <LoginForm />
        </div>
      </main>
    </div>
  )
}
