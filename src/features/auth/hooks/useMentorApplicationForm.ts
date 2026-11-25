import { zodResolver } from '@hookform/resolvers/zod'
import { type Dispatch, type FormEvent, type SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MENTOR_APPLICATION_TEXT } from '../constants'
import { mentorApplicationSchema } from '../schemas'
import type { MentorApplicationInput, MentorApplicationOutput, MentorDocument } from '../types'
import {
  getMentorDocumentError,
  getMissingMentorDocument,
  isValidCredentialFile,
  mergeFiles,
  sendMentorApplication,
  validateCvFile,
} from '../utils'

export function useMentorApplicationForm(onMissingDocument: (document: MentorDocument) => void) {
  const form = useForm<MentorApplicationInput, unknown, MentorApplicationOutput>({
    resolver: zodResolver(mentorApplicationSchema),
    defaultValues: { linkedinUrl: '', motivation: '' },
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [certificates, setCertificates] = useState<File[]>([])
  const [diplomas, setDiplomas] = useState<File[]>([])
  const [documentsError, setDocumentsError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const selectCv = (file: File) => {
    const error = validateCvFile(file)
    setDocumentsError(error)
    if (!error) setCvFile(file)
  }

  const addCredentials = (setFiles: Dispatch<SetStateAction<File[]>>) => (files: File[]) => {
    if (files.length === 0) return
    const validFiles = files.filter(isValidCredentialFile)
    const hasInvalid = validFiles.length < files.length
    setDocumentsError(hasInvalid ? MENTOR_APPLICATION_TEXT.errors.credentialFile : null)
    setFiles((current) => mergeFiles(current, validFiles))
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    const missing = getMissingMentorDocument({
      hasCv: cvFile !== null,
      credentialsCount: certificates.length + diplomas.length,
    })
    setDocumentsError(missing ? getMentorDocumentError(missing) : null)
    await form.handleSubmit(async (values) => {
      if (missing) onMissingDocument(missing)
      if (missing || !cvFile) return
      const error = await sendMentorApplication(values, { cv: cvFile, certificates, diplomas })
      if (error) form.setError('root', { message: error })
      else setIsSubmitted(true)
    })(event)
  }

  return {
    form,
    submit,
    isSubmitted,
    cvFile,
    selectCv,
    certificates,
    addCertificates: addCredentials(setCertificates),
    diplomas,
    addDiplomas: addCredentials(setDiplomas),
    documentsError,
  }
}
