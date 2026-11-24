import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../schemas'
import type { LoginFormInput, LoginFormOutput } from '../types'

export function useLoginForm() {
  const [isRoleChoiceOpen, setIsRoleChoiceOpen] = useState(false)
  const form = useForm<LoginFormInput, unknown, LoginFormOutput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const submit = form.handleSubmit(() => setIsRoleChoiceOpen(true))

  const continueWithGoogle = () => setIsRoleChoiceOpen(true)

  return {
    form,
    submit,
    continueWithGoogle,
    isRoleChoiceOpen,
    setIsRoleChoiceOpen,
  }
}
