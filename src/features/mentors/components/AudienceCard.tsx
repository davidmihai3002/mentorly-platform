import { PROFILE_TEXT } from '../constants'
import type { MentorProfile } from '../types'
import { ProfileCard } from './ProfileCard'

type AudienceCardProps = {
  audience: MentorProfile['audience']
}

export function AudienceCard({ audience }: AudienceCardProps) {
  return (
    <ProfileCard title={PROFILE_TEXT.audienceTitle}>
      <div className="flex flex-col gap-2">
        <h3 className="text-[13px] font-semibold text-foreground">
          {PROFILE_TEXT.requirementsTitle}
        </h3>
        <p className="text-sm leading-[1.55] text-foreground">{audience.requirements}</p>
      </div>
      <div className="flex flex-col gap-2 border-t border-border pt-4">
        <h3 className="text-[13px] font-semibold text-foreground">{PROFILE_TEXT.fitTitle}</h3>
        <p className="text-sm leading-[1.55] text-foreground">{audience.fit}</p>
      </div>
    </ProfileCard>
  )
}
