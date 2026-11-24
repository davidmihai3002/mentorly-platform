import { zodResolver } from '@hookform/resolvers/zod'
import { useState, type FormEvent } from 'react'
import { useForm } from 'react-hook-form'
import { mentorSignupSchema } from '../schemas'
import type { MentorDocument, MentorSignupInput, MentorSignupOutput } from '../types'
import {
  getMentorDocumentError,
  getMissingMentorDocument,
  mergeFiles,
  validateCvFile,
} from '../utils'

export function useMentorSignupForm(onMissingDocument: (document: MentorDocument) => void) {
  const form = useForm<MentorSignupInput, unknown, MentorSignupOutput>({
    resolver: zodResolver(mentorSignupSchema),
    defaultValues: { email: '', password: '' },
  })
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [certificates, setCertificates] = useState<File[]>([])
  const [documentsError, setDocumentsError] = useState<string | null>(null)

  const connectLinkedIn = () => {
    setIsLinkedInConnected(true)
    setDocumentsError(null)
  }

  const selectCv = (file: File) => {
    const error = validateCvFile(file)
    setDocumentsError(error)
    if (!error) setCvFile(file)
  }

  const addCertificates = (files: File[]) => {
    if (files.length === 0) return
    setCertificates((current) => mergeFiles(current, files))
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    const missing = getMissingMentorDocument({ isLinkedInConnected, hasCv: cvFile !== null })
    setDocumentsError(missing ? getMentorDocumentError(missing) : null)
    await form.handleSubmit(() => {
      if (missing) onMissingDocument(missing)
    })(event)
  }

  return {
    form,
    submit,
    isLinkedInConnected,
    connectLinkedIn,
    cvFile,
    selectCv,
    certificates,
    addCertificates,
    documentsError,
  }
}
