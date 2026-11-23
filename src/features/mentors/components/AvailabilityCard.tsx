import { cn } from 'cn'
import { useId, useState } from 'react'
import { AppLink } from '@/components'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, WEEKDAY_NAMES } from '@/constants'
import type { WeeklySlot } from '@/types'
import { PROFILE_TAG_CLASS, PROFILE_TEXT } from '../constants'
import type { MentorProfile } from '../types'
import { ProfileCard } from './ProfileCard'

type AvailabilityCardProps = {
  availability: MentorProfile['availability']
  schedule: readonly WeeklySlot[]
  bookingPath: string
}

export function AvailabilityCard({ availability, schedule, bookingPath }: AvailabilityCardProps) {
  const selectId = useId()
  const [introSlot, setIntroSlot] = useState(availability.introSlots[0] ?? '')
  const search = new URLSearchParams({ apel: introSlot }).toString()

  return (
    <ProfileCard title={PROFILE_TEXT.availabilityTitle}>
      <dl className="flex flex-col gap-2.5 text-[13px]">
        {schedule.map((slot) => (
          <div key={slot.weekday} className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{WEEKDAY_NAMES[slot.weekday]}</dt>
            <dd className="font-semibold text-foreground">
              {slot.start}–{slot.end}
            </dd>
          </div>
        ))}
      </dl>
      <p className="border-b border-border pb-3 text-xs text-muted-foreground">
        {PROFILE_TEXT.timezone}
      </p>
      <p className="text-[13px] text-foreground">{PROFILE_TEXT.availabilityNote}</p>
      <span className={cn(PROFILE_TAG_CLASS, 'w-fit')}>{PROFILE_TEXT.introCall}</span>
      <label htmlFor={selectId} className="sr-only">
        {PROFILE_TEXT.introSlotLabel}
      </label>
      <select
        id={selectId}
        value={introSlot}
        onChange={(event) => setIntroSlot(event.target.value)}
        className="w-fit rounded-sm bg-transparent text-[13px] text-link focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
      >
        {availability.introSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
      <AppLink
        to={`${bookingPath}?${search}`}
        className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, 'text-sm')}
      >
        {PROFILE_TEXT.scheduleCall}
      </AppLink>
    </ProfileCard>
  )
}
