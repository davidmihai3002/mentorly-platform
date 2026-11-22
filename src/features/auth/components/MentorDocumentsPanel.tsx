import type { Ref } from 'react'
import { MENTOR_SIGNUP_TEXT } from '../constants'
import { AuthFieldError } from './AuthFieldError'
import { CvUploadCard } from './CvUploadCard'
import { DocumentsTabs } from './DocumentsTabs'
import { LinkedInRequirementCard } from './LinkedInRequirementCard'
import { VerificationStatus } from './VerificationStatus'

type MentorDocumentsPanelProps = {
  isLinkedInConnected: boolean
  onConnectLinkedIn: () => void
  cvFileName?: string
  certificatesCount: number
  onCvSelect: (file: File) => void
  onCertificatesSelect: (files: File[]) => void
  error: string | null
  errorId: string
  linkedInRef?: Ref<HTMLButtonElement>
  cvButtonRef?: Ref<HTMLButtonElement>
}

export function MentorDocumentsPanel({
  isLinkedInConnected,
  onConnectLinkedIn,
  cvFileName,
  certificatesCount,
  onCvSelect,
  onCertificatesSelect,
  error,
  errorId,
  linkedInRef,
  cvButtonRef,
}: MentorDocumentsPanelProps) {
  const describedById = error ? errorId : undefined
  return (
    <section aria-label={MENTOR_SIGNUP_TEXT.documentsLabel} className="space-y-2.5 bg-panel p-4">
      <DocumentsTabs />
      <LinkedInRequirementCard
        isConnected={isLinkedInConnected}
        onConnect={onConnectLinkedIn}
        buttonRef={linkedInRef}
        describedById={describedById}
      />
      <CvUploadCard
        cvFileName={cvFileName}
        certificatesCount={certificatesCount}
        onCvSelect={onCvSelect}
        onCertificatesSelect={onCertificatesSelect}
        buttonRef={cvButtonRef}
        errorId={describedById}
      />
      <AuthFieldError id={errorId} message={error ?? undefined} />
      <VerificationStatus />
    </section>
  )
}
