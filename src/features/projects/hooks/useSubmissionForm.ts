import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { submissionSchema, type SubmissionValues } from '../schemas'
import { validateProjectFile } from '../utils'

export function useSubmissionForm() {
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const form = useForm<SubmissionValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: { repoUrl: '', hasFile: false, message: '' },
  })

  function selectFile(next: File | null) {
    const error = next ? validateProjectFile(next) : undefined
    setFileError(error)
    const accepted = next && !error ? next : null
    setFile(accepted)
    form.setValue('hasFile', Boolean(accepted), { shouldValidate: form.formState.isSubmitted })
  }

  const submit = form.handleSubmit(() => setIsSubmitted(true))

  return { form, file, fileError, selectFile, submit, isSubmitted }
}
