import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { buildApplicationSchema } from '../schemas'
import type { ApplicationQuestion } from '../types'

export type ApplicationValues = Record<string, string>

export function useApplicationForm(questions: readonly ApplicationQuestion[]) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const schema = useMemo(
    () => buildApplicationSchema(questions.map((question) => question.id)),
    [questions],
  )
  const form = useForm<ApplicationValues>({
    resolver: zodResolver(schema),
    defaultValues: Object.fromEntries(questions.map((question) => [question.id, ''])),
  })

  const submit = form.handleSubmit(() => {
    setIsSubmitted(true)
    setIsConfirmOpen(true)
  })

  return { form, submit, isSubmitted, isConfirmOpen, setIsConfirmOpen }
}
