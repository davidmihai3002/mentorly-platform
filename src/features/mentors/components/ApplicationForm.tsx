import { getFirstName } from '@/utils'
import { cn } from 'cn'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import { PROFILE_TEXT } from '../constants'
import { useApplicationForm } from '../hooks'
import type { MentorProfile } from '../types'
import { ApplicationSentDialog } from './ApplicationSentDialog'
import { AdmissionTestFields } from './AdmissionTestFields'
import { ApplicationAnswerField } from './ApplicationAnswerField'
import { ProfileCard } from './ProfileCard'

type ApplicationFormProps = {
  profile: MentorProfile
  anchorId: string
}

const WIDE_QUESTION_INDEX = 0

export function ApplicationForm({ profile, anchorId }: ApplicationFormProps) {
  const questions = [...profile.applicationQuestions, ...(profile.admissionTest?.questions ?? [])]
  const { form, submit, isSubmitted, isConfirmOpen, setIsConfirmOpen } =
    useApplicationForm(questions)
  const { errors } = form.formState
  const firstName = getFirstName(profile.mentor.name)

  return (
    <form noValidate onSubmit={submit} className="flex scroll-mt-24 flex-col gap-6" id={anchorId}>
      <ProfileCard title={PROFILE_TEXT.applyTitle(firstName)} subtitle={PROFILE_TEXT.applySubtitle}>
        <div className="grid gap-4 md:grid-cols-2">
          {profile.applicationQuestions.map((question, index) => (
            <ApplicationAnswerField
              key={question.id}
              question={question}
              registration={form.register(question.id)}
              error={errors[question.id]?.message}
              className={cn(index === WIDE_QUESTION_INDEX && 'md:col-span-2')}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{PROFILE_TEXT.applyNote}</p>
      </ProfileCard>
      {profile.admissionTest && (
        <AdmissionTestFields
          test={profile.admissionTest}
          register={form.register}
          errors={errors}
        />
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, 'shrink-0')}
        >
          {PROFILE_TEXT.submit}
        </button>
        <p className="text-xs text-muted-foreground">{PROFILE_TEXT.submitNote}</p>
      </div>
      <p
        role="status"
        className={cn('text-sm font-medium text-success-foreground', !isSubmitted && 'sr-only')}
      >
        {isSubmitted ? PROFILE_TEXT.submitted : ''}
      </p>
      <ApplicationSentDialog
        mentorName={profile.mentor.name}
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
      />
    </form>
  )
}
