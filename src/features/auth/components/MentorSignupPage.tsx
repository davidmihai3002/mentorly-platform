import { useId } from 'react'
import { MENTOR_SIGNUP_TEXT } from '../constants'
import { useMentorSignupForm } from '../hooks'
import { AuthCardHeader } from './AuthCardHeader'
import { MentorDocumentsPanel } from './MentorDocumentsPanel'
import { MentorSignupForm } from './MentorSignupForm'

export function MentorSignupPage() {
  const mentor = useMentorSignupForm()
  const documentsErrorId = useId()

  return (
    <>
      <title>{MENTOR_SIGNUP_TEXT.pageTitle}</title>
      <div className="grid w-full max-w-[608px] overflow-hidden rounded-xl border border-border bg-card shadow-card-wide [view-transition-name:auth-card] md:grid-cols-[321px_1fr]">
        <div className="space-y-5 px-7 py-10">
          <AuthCardHeader title={MENTOR_SIGNUP_TEXT.title} subtitle={MENTOR_SIGNUP_TEXT.subtitle} />
          <MentorSignupForm
            form={mentor.form}
            onSubmit={() => void mentor.submit()}
            onLinkedIn={mentor.connectLinkedIn}
            documentsErrorId={mentor.documentsError ? documentsErrorId : undefined}
          />
        </div>
        <MentorDocumentsPanel
          isLinkedInConnected={mentor.isLinkedInConnected}
          onConnectLinkedIn={mentor.connectLinkedIn}
          cvFileName={mentor.cvFile?.name}
          certificatesCount={mentor.certificates.length}
          onCvSelect={mentor.selectCv}
          onCertificatesSelect={mentor.setCertificates}
          error={mentor.documentsError}
          errorId={documentsErrorId}
        />
      </div>
    </>
  )
}
