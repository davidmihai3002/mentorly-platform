import { PROFILE_TEXT } from '../constants'
import type { MentorProfile } from '../types'
import { ProfileCard } from './ProfileCard'

type CapacityCardProps = {
  capacity: MentorProfile['capacity']
}

export function CapacityCard({ capacity }: CapacityCardProps) {
  return (
    <ProfileCard title={PROFILE_TEXT.capacityTitle}>
      <dl className="flex flex-col gap-2.5 text-[13px]">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">{PROFILE_TEXT.capacityMax}</dt>
          <dd className="font-semibold text-foreground">{PROFILE_TEXT.students(capacity.max)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">{PROFILE_TEXT.capacityCurrent}</dt>
          <dd className="font-semibold text-foreground">
            {PROFILE_TEXT.students(capacity.current)}
          </dd>
        </div>
      </dl>
      <p className="text-xs text-muted-foreground">{PROFILE_TEXT.capacityNote}</p>
    </ProfileCard>
  )
}
