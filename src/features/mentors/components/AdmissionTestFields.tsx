import { ExternalLinkItem } from '@/components'
import { BookOpen } from 'lucide-react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { PROFILE_TAG_CLASS, PROFILE_TEXT } from '../constants'
import type { ApplicationValues } from '../hooks'
import type { MentorProfile } from '../types'
import { ApplicationAnswerField } from './ApplicationAnswerField'
import { ProfileCard } from './ProfileCard'

type AdmissionTestFieldsProps = {
  test: NonNullable<MentorProfile['admissionTest']>
  register: UseFormRegister<ApplicationValues>
  errors: FieldErrors<ApplicationValues>
}

export function AdmissionTestFields({ test, register, errors }: AdmissionTestFieldsProps) {
  return (
    <ProfileCard
      title={PROFILE_TEXT.testTitle}
      aside={<span className={`${PROFILE_TAG_CLASS} uppercase`}>{PROFILE_TEXT.testBadge}</span>}
    >
      <p className="text-sm leading-[1.55] text-foreground">{test.intro}</p>
      <div className="flex gap-3 rounded-[12px] border border-border-soft bg-selected p-4">
        <BookOpen aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-link" />
        <div className="flex flex-col gap-1">
          <h3 className="text-[13px] font-semibold text-foreground">
            {PROFILE_TEXT.resourcesTitle}
          </h3>
          <ul className="flex flex-col gap-0.5">
            {test.resources.map((resource) => (
              <li key={resource.href}>
                <ExternalLinkItem link={resource} />
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-muted-foreground">{PROFILE_TEXT.resourcesMeta}</p>
        </div>
      </div>
      {test.questions.map((question) => (
        <ApplicationAnswerField
          key={question.id}
          question={question}
          registration={register(question.id)}
          error={errors[question.id]?.message}
        />
      ))}
    </ProfileCard>
  )
}
