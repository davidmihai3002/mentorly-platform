import { FileTextIcon } from 'lucide-react'
import { useId, type ReactNode, type Ref } from 'react'
import { MENTOR_SIGNUP_TEXT } from '../constants'
import { FileDropzone } from './FileDropzone'

type CvUploadCardProps = {
  cvFileName?: string
  onCvSelect: (file: File) => void
  buttonRef?: Ref<HTMLButtonElement>
  errorId?: string
  children: ReactNode
}

export function CvUploadCard({
  cvFileName,
  onCvSelect,
  buttonRef,
  errorId,
  children,
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
      {children}
    </div>
  )
}
