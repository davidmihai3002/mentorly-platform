import { LOGIN_TEXT } from '../constants'
import { logLoginAction } from '../utils'
import { AuthBackdrop } from './AuthBackdrop'
import { AuthCardHeader } from './AuthCardHeader'
import { AuthFooter } from './AuthFooter'
import { AuthNavbar } from './AuthNavbar'
import { LoginForm } from './LoginForm'

type LoginPageProps = {
  onNavigateToSignup?: () => void
}

export function LoginPage({ onNavigateToSignup }: LoginPageProps) {
  const handleNavLogin = () => {
    logLoginAction('nav-login', { email: '', password: '' })
  }

  const handleNavRegister = () => {
    logLoginAction('nav-register', { email: '', password: '' })
    onNavigateToSignup?.()
  }

  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <title>{LOGIN_TEXT.pageTitle}</title>
      <AuthBackdrop />
      <AuthNavbar onLoginClick={handleNavLogin} onRegisterClick={handleNavRegister} />

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-[440px] space-y-5 rounded-2xl border border-border/80 bg-card p-6 shadow-lg sm:p-8">
          <AuthCardHeader title={LOGIN_TEXT.title} subtitle={LOGIN_TEXT.subtitle} />
          <LoginForm onNavigateToSignup={onNavigateToSignup} />
        </div>
      </main>

      <AuthFooter />
    </div>
  )
}
