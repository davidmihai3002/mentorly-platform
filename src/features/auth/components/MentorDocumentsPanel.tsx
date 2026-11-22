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
}: MentorDocumentsPanelProps) {
  return (
    <section aria-label={MENTOR_SIGNUP_TEXT.documentsLabel} className="space-y-3 bg-panel p-5">
      <DocumentsTabs />
      <LinkedInRequirementCard isConnected={isLinkedInConnected} onConnect={onConnectLinkedIn} />
      <CvUploadCard
        cvFileName={cvFileName}
        certificatesCount={certificatesCount}
        onCvSelect={onCvSelect}
        onCertificatesSelect={onCertificatesSelect}
      />
      <AuthFieldError id={errorId} message={error ?? undefined} />
      <VerificationStatus />
    </section>
  )
}
