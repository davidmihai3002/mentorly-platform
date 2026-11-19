import { useState } from 'react'
import { LoginPage, SignupPage } from '@/features/auth'

type AuthView = 'login' | 'signup'

function App() {
  const [view, setView] = useState<AuthView>('signup')

  if (view === 'login') {
    return <LoginPage onNavigateToSignup={() => setView('signup')} />
  }

  return <SignupPage onNavigateToLogin={() => setView('login')} />
}

export default App
