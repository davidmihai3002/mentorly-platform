import type { UploadMimeType } from '@/api'
import {
  CREDENTIAL_MAX_SIZE_BYTES,
  CV_MAX_SIZE_BYTES,
  MENTOR_APPLICATION_TEXT,
  MENTOR_SIGNUP_TEXT,
} from '../constants'
import type { MentorDocument } from '../types'

const MIME_TYPES_BY_EXTENSION: Record<string, UploadMimeType> = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
}

const UPLOAD_MIME_TYPES = new Set<string>(Object.values(MIME_TYPES_BY_EXTENSION))

function isUploadMimeType(type: string): type is UploadMimeType {
  return UPLOAD_MIME_TYPES.has(type)
}

export function getUploadMimeType(file: Pick<File, 'name' | 'type'>): UploadMimeType | null {
  if (isUploadMimeType(file.type)) return file.type
  const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
  return MIME_TYPES_BY_EXTENSION[extension] ?? null
}

export function validateCvFile(file: Pick<File, 'name' | 'type' | 'size'>): string | null {
  if (getUploadMimeType(file) !== 'application/pdf') return MENTOR_SIGNUP_TEXT.errors.cvType
  if (file.size > CV_MAX_SIZE_BYTES) return MENTOR_SIGNUP_TEXT.errors.cvSize
  return null
}

export function isValidCredentialFile(file: Pick<File, 'name' | 'type' | 'size'>): boolean {
  return getUploadMimeType(file) !== null && file.size <= CREDENTIAL_MAX_SIZE_BYTES
}

export function getMissingMentorDocument(documents: {
  hasCv: boolean
  credentialsCount: number
}): MentorDocument | null {
  if (!documents.hasCv) return 'cv'
  if (documents.credentialsCount === 0) return 'credentials'
  return null
}

export function getMentorDocumentError(document: MentorDocument): string {
  return document === 'cv'
    ? MENTOR_SIGNUP_TEXT.errors.cvMissing
    : MENTOR_APPLICATION_TEXT.errors.credentialsMissing
}

export function mergeFiles(current: readonly File[], added: readonly File[]): File[] {
  const names = new Set(current.map((file) => file.name))
  return [...current, ...added.filter((file) => !names.has(file.name))]
}
