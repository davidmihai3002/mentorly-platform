import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { forgotPasswordSchema } from '../schemas'
import type { ForgotPasswordInput, ForgotPasswordOutput } from '../types'

export function useForgotPasswordForm() {
  const [isSent, setIsSent] = useState(false)
  const form = useForm<ForgotPasswordInput, unknown, ForgotPasswordOutput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  const submit = form.handleSubmit(() => setIsSent(true))

  return { form, submit, isSent }
}
