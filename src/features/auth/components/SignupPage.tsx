import { SIGNUP_TEXT } from '../constants'
import { EMPTY_SIGNUP_VALUES, logSignupAction } from '../utils'
import { AuthBackdrop } from './AuthBackdrop'
import { AuthCardHeader } from './AuthCardHeader'
import { AuthFooter } from './AuthFooter'
import { AuthNavbar } from './AuthNavbar'
import { SignupForm } from './SignupForm'

type SignupPageProps = {
  onNavigateToLogin?: () => void
}

export function SignupPage({ onNavigateToLogin }: SignupPageProps) {
  const handleNavLogin = () => {
    logSignupAction('nav-login', EMPTY_SIGNUP_VALUES)
    onNavigateToLogin?.()
  }

  const handleNavRegister = () => {
    logSignupAction('nav-register', EMPTY_SIGNUP_VALUES)
  }

  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <title>{SIGNUP_TEXT.pageTitle}</title>
      <AuthBackdrop />
      <AuthNavbar onLoginClick={handleNavLogin} onRegisterClick={handleNavRegister} />

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-[440px] space-y-5 rounded-2xl border border-border/80 bg-card p-6 shadow-lg sm:p-8">
          <AuthCardHeader title={SIGNUP_TEXT.title} subtitle={SIGNUP_TEXT.subtitle} />
          <SignupForm onNavigateToLogin={onNavigateToLogin} />
        </div>
      </main>

      <AuthFooter />
    </div>
  )
}
