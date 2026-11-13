import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../schemas'
import type { LoginAction, LoginFormInput, LoginFormOutput } from '../types'
import { logLoginAction } from '../utils'

export function useLoginForm() {
  const form = useForm<LoginFormInput, unknown, LoginFormOutput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const submit = form.handleSubmit((values) => {
    logLoginAction('login', values)
  })

  const logCurrentValues = (action: LoginAction) => {
    logLoginAction(action, form.getValues())
  }

  return { form, submit, logCurrentValues }
}
