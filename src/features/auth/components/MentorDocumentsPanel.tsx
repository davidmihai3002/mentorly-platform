import type { Ref } from 'react'
import { MENTOR_APPLICATION_TEXT, MENTOR_SIGNUP_TEXT } from '../constants'
import { AuthFieldError } from './AuthFieldError'
import { CertificatesField } from './CertificatesField'
import { CvUploadCard } from './CvUploadCard'

type MentorDocumentsPanelProps = {
  cvFileName?: string
  certificatesCount: number
  diplomasCount: number
  onCvSelect: (file: File) => void
  onCertificatesSelect: (files: File[]) => void
  onDiplomasSelect: (files: File[]) => void
  error: string | null
  errorId: string
  cvButtonRef?: Ref<HTMLButtonElement>
  certificatesInputRef?: Ref<HTMLInputElement>
}

export function MentorDocumentsPanel({
  cvFileName,
  certificatesCount,
  diplomasCount,
  onCvSelect,
  onCertificatesSelect,
  onDiplomasSelect,
  error,
  errorId,
  cvButtonRef,
  certificatesInputRef,
}: MentorDocumentsPanelProps) {
  const describedById = error ? errorId : undefined
  return (
    <section aria-label={MENTOR_SIGNUP_TEXT.documentsLabel} className="space-y-2.5 bg-panel p-4">
      <CvUploadCard
        cvFileName={cvFileName}
        onCvSelect={onCvSelect}
        buttonRef={cvButtonRef}
        errorId={describedById}
      >
        <CertificatesField
          label={MENTOR_APPLICATION_TEXT.certificates}
          count={certificatesCount}
          onSelect={onCertificatesSelect}
          inputRef={certificatesInputRef}
          describedById={describedById}
        />
        <CertificatesField
          label={MENTOR_APPLICATION_TEXT.diplomas}
          count={diplomasCount}
          onSelect={onDiplomasSelect}
          describedById={describedById}
        />
      </CvUploadCard>
      <AuthFieldError id={errorId} message={error ?? undefined} />
    </section>
  )
}
