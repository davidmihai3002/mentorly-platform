import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { type AuthResponse, googleRegister, type UserRole } from '@/api'
import { useSession } from '@/session'
import { googleSignupSchema } from '../schemas'
import type { GoogleSignupInput, GoogleSignupOutput } from '../types'
import { getGoogleSignupError, getSignupHome } from '../utils'

export function useGoogleSignupForm(idToken: string, defaultRole: UserRole) {
  const navigate = useNavigate()
  const { signIn } = useSession()
  const form = useForm<GoogleSignupInput, unknown, GoogleSignupOutput>({
    resolver: zodResolver(googleSignupSchema),
    defaultValues: { role: defaultRole, birthDate: '', isTermsAccepted: false },
  })

  const submit = form.handleSubmit(async ({ role, birthDate }) => {
    let auth: AuthResponse
    try {
      auth = await googleRegister({ idToken, role, birthDate, hasAcceptedTerms: true })
    } catch (error) {
      const { field, message } = getGoogleSignupError(error)
      form.setError(field, { message }, { shouldFocus: field !== 'root' })
      return
    }
    signIn(auth)
    await navigate(getSignupHome(auth.user.role), { replace: true, viewTransition: true })
  })

  return { form, submit }
}
