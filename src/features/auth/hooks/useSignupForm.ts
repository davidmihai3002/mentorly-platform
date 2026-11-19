import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signupSchema } from '../schemas'
import type { SignupAction, SignupFormInput, SignupFormOutput } from '../types'
import { EMPTY_SIGNUP_VALUES, logSignupAction } from '../utils'

export function useSignupForm() {
  const form = useForm<SignupFormInput, unknown, SignupFormOutput>({
    resolver: zodResolver(signupSchema),
    defaultValues: EMPTY_SIGNUP_VALUES,
  })

  const submit = form.handleSubmit((values) => {
    logSignupAction('signup', values)
  })

  const logCurrentValues = (action: SignupAction) => {
    logSignupAction(action, form.getValues())
  }

  return { form, submit, logCurrentValues }
}
