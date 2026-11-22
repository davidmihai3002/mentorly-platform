import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { forgotPasswordSchema } from '../schemas'
import type { ForgotPasswordInput, ForgotPasswordOutput } from '../types'
import { logAuthEvent } from '../utils'

export function useForgotPasswordForm() {
  const [isSent, setIsSent] = useState(false)
  const form = useForm<ForgotPasswordInput, unknown, ForgotPasswordOutput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const submit = form.handleSubmit((values) => {
    logAuthEvent('forgot-password', values)
    setIsSent(true)
  })

  return { form, submit, isSent }
}
