import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { type AuthResponse, register, type UserRole } from '@/api'
import { useSession } from '@/session'
import { EMPTY_SIGNUP_VALUES } from '../constants'
import { signupSchema } from '../schemas'
import type { SignupFormInput, SignupFormOutput } from '../types'
import { getSignupError, getSignupHome } from '../utils'

export function useSignupForm(role: UserRole) {
  const navigate = useNavigate()
  const { signIn } = useSession()
  const form = useForm<SignupFormInput, unknown, SignupFormOutput>({
    resolver: zodResolver(signupSchema),
    defaultValues: EMPTY_SIGNUP_VALUES,
  })

  const submit = form.handleSubmit(async ({ firstName, lastName, email, password, birthDate }) => {
    let auth: AuthResponse
    try {
      auth = await register({
        role,
        firstName,
        lastName,
        email,
        password,
        birthDate,
        hasAcceptedTerms: true,
      })
    } catch (error) {
      const { field, message } = getSignupError(error)
      form.setError(field, { message }, { shouldFocus: field !== 'root' })
      return
    }
    signIn(auth)
    await navigate(getSignupHome(role), { replace: true, viewTransition: true })
  })

  return { form, submit }
}
