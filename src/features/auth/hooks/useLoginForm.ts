import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../schemas'
import type { LoginAction, LoginFormInput, LoginFormOutput } from '../types'
import { logLoginAction } from '../utils'

export function useLoginForm() {
  const [isRoleChoiceOpen, setIsRoleChoiceOpen] = useState(false)
  const form = useForm<LoginFormInput, unknown, LoginFormOutput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const submit = form.handleSubmit((values) => {
    logLoginAction('login', values)
    setIsRoleChoiceOpen(true)
  })

  const logCurrentValues = (action: LoginAction) => {
    logLoginAction(action, form.getValues())
  }

  const continueWithGoogle = () => {
    logCurrentValues('google')
    setIsRoleChoiceOpen(true)
  }

  return {
    form,
    submit,
    logCurrentValues,
    continueWithGoogle,
    isRoleChoiceOpen,
    setIsRoleChoiceOpen,
  }
}
