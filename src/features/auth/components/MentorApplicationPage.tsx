import { useRef } from 'react'
import { MENTOR_APPLICATION_TEXT } from '../constants'
import { useMentorApplicationForm } from '../hooks'
import type { MentorDocument } from '../types'
import { AuthCard } from './AuthCard'
import { AuthCardHeader } from './AuthCardHeader'
import { MentorApplicationForm } from './MentorApplicationForm'
import { VerificationStatus } from './VerificationStatus'

export function MentorApplicationPage() {
  const cvButtonRef = useRef<HTMLButtonElement>(null)
  const certificatesInputRef = useRef<HTMLInputElement>(null)

  const focusMissingDocument = (document: MentorDocument) => {
    const target = document === 'cv' ? cvButtonRef.current : certificatesInputRef.current
    target?.focus()
  }

  const application = useMentorApplicationForm(focusMissingDocument)

  return (
    <>
      <title>{MENTOR_APPLICATION_TEXT.pageTitle}</title>
      {application.isSubmitted ? (
        <div className="flex justify-center">
          <AuthCard density="regular">
            <AuthCardHeader title={MENTOR_APPLICATION_TEXT.title} />
            <VerificationStatus text={MENTOR_APPLICATION_TEXT.submitted} />
          </AuthCard>
        </div>
      ) : (
        <MentorApplicationForm
          application={application}
          cvButtonRef={cvButtonRef}
          certificatesInputRef={certificatesInputRef}
        />
      )}
    </>
  )
}
