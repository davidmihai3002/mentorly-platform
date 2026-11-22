import { CV_MAX_SIZE_BYTES, MENTOR_SIGNUP_TEXT } from '../constants'

const PDF_TYPE = 'application/pdf'

export function validateCvFile(file: Pick<File, 'name' | 'type' | 'size'>): string | null {
  const isPdf = file.type === PDF_TYPE || file.name.toLowerCase().endsWith('.pdf')
  if (!isPdf) return MENTOR_SIGNUP_TEXT.errors.cvType
  if (file.size > CV_MAX_SIZE_BYTES) return MENTOR_SIGNUP_TEXT.errors.cvSize
  return null
}

export function getMentorDocumentsError(documents: {
  isLinkedInConnected: boolean
  hasCv: boolean
}): string | null {
  if (!documents.isLinkedInConnected) return MENTOR_SIGNUP_TEXT.errors.linkedinMissing
  if (!documents.hasCv) return MENTOR_SIGNUP_TEXT.errors.cvMissing
  return null
}
