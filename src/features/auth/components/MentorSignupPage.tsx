import { useId, useRef } from 'react'
import { MENTOR_SIGNUP_TEXT } from '../constants'
import { useMentorSignupForm } from '../hooks'
import type { MentorDocument } from '../types'
import { AuthCardHeader } from './AuthCardHeader'
import { MentorDocumentsPanel } from './MentorDocumentsPanel'
import { MentorSignupForm } from './MentorSignupForm'

export function MentorSignupPage() {
  const documentsErrorId = useId()
  const linkedInRef = useRef<HTMLButtonElement>(null)
  const cvButtonRef = useRef<HTMLButtonElement>(null)

  const focusMissingDocument = (document: MentorDocument) => {
    const target = document === 'linkedin' ? linkedInRef.current : cvButtonRef.current
    target?.focus()
  }

  const mentor = useMentorSignupForm(focusMissingDocument)

  return (
    <>
      <title>{MENTOR_SIGNUP_TEXT.pageTitle}</title>
      <div className="grid w-full max-w-[608px] overflow-hidden rounded-[12px] border border-border bg-card shadow-card-wide [view-transition-name:auth-card] md:grid-cols-[321px_1fr]">
        <div className="space-y-4 px-7 py-8">
          <AuthCardHeader title={MENTOR_SIGNUP_TEXT.title} subtitle={MENTOR_SIGNUP_TEXT.subtitle} />
          <MentorSignupForm
            form={mentor.form}
            onSubmit={(event) => void mentor.submit(event)}
            onLinkedIn={mentor.connectLinkedIn}
          />
        </div>
        <MentorDocumentsPanel
          isLinkedInConnected={mentor.isLinkedInConnected}
          onConnectLinkedIn={mentor.connectLinkedIn}
          cvFileName={mentor.cvFile?.name}
          certificatesCount={mentor.certificates.length}
          onCvSelect={mentor.selectCv}
          onCertificatesSelect={mentor.addCertificates}
          error={mentor.documentsError}
          errorId={documentsErrorId}
          linkedInRef={linkedInRef}
          cvButtonRef={cvButtonRef}
        />
      </div>
    </>
  )
}
