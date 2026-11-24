import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import { type AuthResponse, login } from '@/api'
import { useSession } from '@/session'
import { getAccountHome } from '@/utils'
import { loginSchema } from '../schemas'
import type { LoginFormInput, LoginFormOutput } from '../types'
import { getLoginError, getRedirectPath } from '../utils'

export function useLoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useSession()
  const form = useForm<LoginFormInput, unknown, LoginFormOutput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const submit = form.handleSubmit(async (values) => {
    let auth: AuthResponse
    try {
      auth = await login(values)
    } catch (error) {
      form.setError('root', { message: getLoginError(error) })
      return
    }
    signIn(auth)
    const target = getRedirectPath(location.state) ?? getAccountHome(auth.user.role)
    await navigate(target, { replace: true, viewTransition: true })
  })

  return { form, submit }
}
