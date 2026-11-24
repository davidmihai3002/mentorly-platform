import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signupSchema } from '../schemas'
import { EMPTY_SIGNUP_VALUES } from '../constants'
import type { SignupFormInput, SignupFormOutput } from '../types'

export function useSignupForm() {
  const form = useForm<SignupFormInput, unknown, SignupFormOutput>({
    resolver: zodResolver(signupSchema),
    defaultValues: EMPTY_SIGNUP_VALUES,
  })

  const submit = form.handleSubmit(() => undefined)

  return { form, submit }
}
