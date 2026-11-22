import { CV_MAX_SIZE_BYTES, MENTOR_SIGNUP_TEXT } from '../constants'
import type { MentorDocument } from '../types'

const PDF_TYPE = 'application/pdf'

export function validateCvFile(file: Pick<File, 'name' | 'type' | 'size'>): string | null {
  const isPdf = file.type === PDF_TYPE || file.name.toLowerCase().endsWith('.pdf')
  if (!isPdf) return MENTOR_SIGNUP_TEXT.errors.cvType
  if (file.size > CV_MAX_SIZE_BYTES) return MENTOR_SIGNUP_TEXT.errors.cvSize
  return null
}

export function getMissingMentorDocument(documents: {
  isLinkedInConnected: boolean
  hasCv: boolean
}): MentorDocument | null {
  if (!documents.isLinkedInConnected) return 'linkedin'
  if (!documents.hasCv) return 'cv'
  return null
}

export function getMentorDocumentError(document: MentorDocument): string {
  return document === 'linkedin'
    ? MENTOR_SIGNUP_TEXT.errors.linkedinMissing
    : MENTOR_SIGNUP_TEXT.errors.cvMissing
}

export function mergeFiles(current: readonly File[], added: readonly File[]): File[] {
  const names = new Set(current.map((file) => file.name))
  return [...current, ...added.filter((file) => !names.has(file.name))]
}
