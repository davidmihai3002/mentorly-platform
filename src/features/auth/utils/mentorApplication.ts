import {
  createUploadUrl,
  type CredentialType,
  type MentorCredential,
  submitMentorApplication,
  uploadToUrl,
} from '@/api'
import { MENTOR_APPLICATION_TEXT } from '../constants'
import type { MentorApplicationOutput } from '../types'
import { getApplicationError } from './authErrors'
import { getUploadMimeType } from './mentorDocuments'

const LINKEDIN_HOST = 'linkedin.com'

type ApplicationFiles = {
  cv: File
  certificates: readonly File[]
  diplomas: readonly File[]
}

function parseUrl(value: string): URL | null {
  try {
    return new URL(value)
  } catch {
    return null
  }
}

export function isLinkedInUrl(value: string): boolean {
  const url = parseUrl(value)
  if (!url || url.protocol !== 'https:') return false
  return url.hostname === LINKEDIN_HOST || url.hostname.endsWith(`.${LINKEDIN_HOST}`)
}

async function uploadFile(file: File): Promise<string> {
  const mimeType = getUploadMimeType(file)
  if (!mimeType) throw new Error(`Unsupported file type: ${file.name}`)
  const { fileId, uploadUrl } = await createUploadUrl({
    fileName: file.name,
    mimeType,
    sizeBytes: file.size,
  })
  await uploadToUrl(uploadUrl, file, mimeType)
  return fileId
}

function uploadCredentials(
  files: readonly File[],
  type: CredentialType,
): Promise<MentorCredential[]> {
  return Promise.all(files.map(async (file) => ({ fileId: await uploadFile(file), type })))
}

async function uploadApplicationFiles({ cv, certificates, diplomas }: ApplicationFiles) {
  const [cvFileId, certificateCredentials, diplomaCredentials] = await Promise.all([
    uploadFile(cv),
    uploadCredentials(certificates, 'CERTIFICATE'),
    uploadCredentials(diplomas, 'DIPLOMA'),
  ])
  return { cvFileId, credentials: [...certificateCredentials, ...diplomaCredentials] }
}

export async function sendMentorApplication(
  fields: MentorApplicationOutput,
  files: ApplicationFiles,
): Promise<string | null> {
  let uploaded: Awaited<ReturnType<typeof uploadApplicationFiles>>
  try {
    uploaded = await uploadApplicationFiles(files)
  } catch {
    return MENTOR_APPLICATION_TEXT.errors.uploadFailed
  }
  try {
    await submitMentorApplication({ ...fields, ...uploaded })
  } catch (error) {
    return getApplicationError(error)
  }
  return null
}
