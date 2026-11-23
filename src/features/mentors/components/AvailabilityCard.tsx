import { cn } from 'cn'
import { useId, useState } from 'react'
import { AppLink } from '@/components'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import { PROFILE_TAG_CLASS, PROFILE_TEXT } from '../constants'
import type { MentorProfile } from '../types'
import { ProfileCard } from './ProfileCard'

type AvailabilityCardProps = {
  availability: MentorProfile['availability']
  bookingPath: string
}

export function AvailabilityCard({ availability, bookingPath }: AvailabilityCardProps) {
  const selectId = useId()
  const [introSlot, setIntroSlot] = useState(availability.introSlots[0] ?? '')
  const search = new URLSearchParams({ apel: introSlot }).toString()

  return (
    <ProfileCard title={PROFILE_TEXT.availabilityTitle}>
      <dl className="flex flex-col gap-2.5 text-[13px]">
        {availability.slots.map((slot) => (
          <div key={slot.day} className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{slot.day}</dt>
            <dd className="font-semibold text-foreground">{slot.time}</dd>
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
