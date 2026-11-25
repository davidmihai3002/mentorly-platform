export type CredentialType = 'CERTIFICATE' | 'DIPLOMA'

export type MentorCredential = {
  fileId: string
  type: CredentialType
}

export type MentorApplicationRequest = {
  linkedinUrl: string
  motivation: string
  cvFileId: string
  credentials: MentorCredential[]
}

export type MentorApplicationResponse = {
  status: 'PENDING'
  submittedAt: string
}
