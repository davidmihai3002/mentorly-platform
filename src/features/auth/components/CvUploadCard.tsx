import { FileTextIcon } from 'lucide-react'
import { useId, type Ref } from 'react'
import { MENTOR_SIGNUP_TEXT } from '../constants'
import { CertificatesField } from './CertificatesField'
import { FileDropzone } from './FileDropzone'

type CvUploadCardProps = {
  cvFileName?: string
  certificatesCount: number
  onCvSelect: (file: File) => void
  onCertificatesSelect: (files: File[]) => void
  buttonRef?: Ref<HTMLButtonElement>
  errorId?: string
}

export function CvUploadCard({
  cvFileName,
  certificatesCount,
  onCvSelect,
  onCertificatesSelect,
  buttonRef,
  errorId,
}: CvUploadCardProps) {
  const titleId = useId()

  return (
    <div className="space-y-2.5 rounded-lg border border-border bg-card p-2.5">
      <p id={titleId} className="flex items-center gap-2 text-xs text-foreground">
        <FileTextIcon aria-hidden="true" className="size-4" />
        {MENTOR_SIGNUP_TEXT.cvTitle}
      </p>
      <FileDropzone
        accept="application/pdf,.pdf"
        fileName={cvFileName}
        describedById={[titleId, errorId].filter(Boolean).join(' ')}
        buttonRef={buttonRef}
        onFile={onCvSelect}
      />
      <CertificatesField count={certificatesCount} onSelect={onCertificatesSelect} />
    </div>
  )
}
