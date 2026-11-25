import { cn } from 'cn'
import { useId, type Ref } from 'react'
import { Button } from '@/components/ui'
import { AUTH_DENSITY_STYLES, AUTH_SUBMIT_BASE_CLASS, MENTOR_APPLICATION_TEXT } from '../constants'
import type { useMentorApplicationForm } from '../hooks'
import { AuthCardHeader } from './AuthCardHeader'
import { AuthFieldError } from './AuthFieldError'
import { AuthTextField } from './AuthTextField'
import { MentorDocumentsPanel } from './MentorDocumentsPanel'
import { MotivationField } from './MotivationField'

type MentorApplicationFormProps = {
  application: ReturnType<typeof useMentorApplicationForm>
  cvButtonRef: Ref<HTMLButtonElement>
  certificatesInputRef: Ref<HTMLInputElement>
}

export function MentorApplicationForm({
  application,
  cvButtonRef,
  certificatesInputRef,
}: MentorApplicationFormProps) {
  const { form } = application
  const { errors, isSubmitting } = form.formState
  const documentsErrorId = useId()
  const formErrorId = useId()
  const styles = AUTH_DENSITY_STYLES.regular

  return (
    <form
      onSubmit={(event) => void application.submit(event)}
      noValidate
      className="mx-auto grid w-full max-w-[608px] overflow-hidden rounded-[12px] border border-border bg-card shadow-card-wide md:grid-cols-[321px_1fr]"
    >
      <div className={cn('px-7 py-8', styles.stack)}>
        <AuthCardHeader title={MENTOR_APPLICATION_TEXT.title} />
        <AuthTextField
          label={MENTOR_APPLICATION_TEXT.linkedinLabel}
          type="url"
          helperText={MENTOR_APPLICATION_TEXT.linkedinHelper}
          autoComplete="url"
          error={errors.linkedinUrl?.message}
          registration={form.register('linkedinUrl')}
        />
        <MotivationField
          label={MENTOR_APPLICATION_TEXT.motivationLabel}
          error={errors.motivation?.message}
          registration={form.register('motivation')}
        />
      </div>
      <MentorDocumentsPanel
        cvFileName={application.cvFile?.name}
        certificatesCount={application.certificates.length}
        diplomasCount={application.diplomas.length}
        onCvSelect={application.selectCv}
        onCertificatesSelect={application.addCertificates}
        onDiplomasSelect={application.addDiplomas}
        error={application.documentsError}
        errorId={documentsErrorId}
        cvButtonRef={cvButtonRef}
        certificatesInputRef={certificatesInputRef}
      />
      <div className="space-y-3 border-t border-border px-7 py-5 md:col-span-2">
        <AuthFieldError id={formErrorId} message={errors.root?.message} />
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(AUTH_SUBMIT_BASE_CLASS, styles.submit)}
        >
          {MENTOR_APPLICATION_TEXT.submit}
        </Button>
      </div>
    </form>
  )
}
