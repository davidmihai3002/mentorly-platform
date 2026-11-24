import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { resetPasswordSchema } from '../schemas'
import type { ResetPasswordInput, ResetPasswordOutput } from '../types'

export function useResetPasswordForm() {
  const [isSaved, setIsSaved] = useState(false)
  const form = useForm<ResetPasswordInput, unknown, ResetPasswordOutput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  const submit = form.handleSubmit(() => setIsSaved(true))

  return { form, submit, isSaved }
}
