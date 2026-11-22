import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../schemas'
import type { LoginFormInput, LoginFormOutput } from '../types'
import { getMentorDocumentsError, logAuthEvent, validateCvFile } from '../utils'

export function useMentorSignupForm() {
  const form = useForm<LoginFormInput, unknown, LoginFormOutput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [certificates, setCertificates] = useState<File[]>([])
  const [documentsError, setDocumentsError] = useState<string | null>(null)

  const connectLinkedIn = () => {
    setIsLinkedInConnected(true)
    setDocumentsError(null)
    logAuthEvent('linkedin-connect', { connected: true })
  }

  const selectCv = (file: File) => {
    const error = validateCvFile(file)
    setDocumentsError(error)
    if (!error) setCvFile(file)
  }

  const submit = form.handleSubmit((values) => {
    const error = getMentorDocumentsError({ isLinkedInConnected, hasCv: cvFile !== null })
    setDocumentsError(error)
    if (error) return
    logAuthEvent('mentor-signup', {
      email: values.email,
      password: values.password,
      linkedin: isLinkedInConnected,
      cv: cvFile?.name ?? null,
      certificates: certificates.length,
    })
  })

  return {
    form,
    submit,
    isLinkedInConnected,
    connectLinkedIn,
    cvFile,
    selectCv,
    certificates,
    setCertificates,
    documentsError,
  }
}
