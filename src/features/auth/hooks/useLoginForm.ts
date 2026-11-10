import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, type FieldErrors } from 'react-hook-form'
import { loginSchema } from '../schemas'
import type { LoginAction, LoginFormInput, LoginFormOutput } from '../types'
import { buildErrorSummary, logLoginAction } from '../utils'

/** Starea formularului de login, acțiunile butoanelor și rezumatul erorilor (anunțat). */
export function useLoginForm() {
  const form = useForm<LoginFormInput, unknown, LoginFormOutput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })
  const [errorSummary, setErrorSummary] = useState('')

  const announceErrors = (errors: FieldErrors<LoginFormInput>) => {
    const messages = [errors.email?.message, errors.password?.message].filter(
      (message): message is string => Boolean(message),
    )
    // Un spațiu neseparabil alternant forțează reanunțarea la o nouă trimitere identică.
    setErrorSummary((previous) => {
      const next = buildErrorSummary(messages)
      return previous === next ? `${next}\u00A0` : next
    })
  }

  const submit = form.handleSubmit((values) => {
    setErrorSummary('')
    logLoginAction('login', values)
  }, announceErrors)

  /** Pentru butoanele care nu trimit formularul: loghează ce s-a completat, fără validare. */
  const logCurrentValues = (action: LoginAction) => {
    logLoginAction(action, form.getValues())
  }

  return { form, submit, logCurrentValues, errorSummary }
}
