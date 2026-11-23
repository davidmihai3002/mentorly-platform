import { SectionCard } from '@/components'
import { STUDENT_PROFILE_TEXT } from '../constants'

type AboutCardProps = {
  about: string
}

export function AboutCard({ about }: AboutCardProps) {
  return (
    <SectionCard title={STUDENT_PROFILE_TEXT.aboutTitle}>
      <p className="text-[13px] leading-[1.55] text-foreground">{about}</p>
      <p className="text-xs text-link">
        {STUDENT_PROFILE_TEXT.studyTimeLabel}
        <br />
        {STUDENT_PROFILE_TEXT.studyTime}
      </p>
    </SectionCard>
  )
}
