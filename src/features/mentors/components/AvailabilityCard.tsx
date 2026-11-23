import { cn } from 'cn'
import { useId, useState } from 'react'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, WEEKDAY_NAMES } from '@/constants'
import type { WeeklySlot } from '@/types'
import { PROFILE_TAG_CLASS, PROFILE_TEXT } from '../constants'
import type { MentorProfile } from '../types'
import { formatIntroDate, formatIntroSlot } from '../utils'
import { IntroCallDialog } from './IntroCallDialog'
import { ProfileCard } from './ProfileCard'

type AvailabilityCardProps = {
  mentorName: string
  availability: MentorProfile['availability']
  schedule: readonly WeeklySlot[]
}

export function AvailabilityCard({ mentorName, availability, schedule }: AvailabilityCardProps) {
  const selectId = useId()
  const [slotIndex, setSlotIndex] = useState(0)
  const [confirmed, setConfirmed] = useState<string>()
  const slot = availability.introSlots[slotIndex]
  const slotLabel = slot ? formatIntroDate(slot) : ''

  return (
    <ProfileCard title={PROFILE_TEXT.availabilityTitle}>
      <dl className="flex flex-col gap-2.5 text-[13px]">
        {schedule.map((window) => (
          <div key={window.weekday} className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{WEEKDAY_NAMES[window.weekday]}</dt>
            <dd className="font-semibold text-foreground">
              {window.start}–{window.end}
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
        value={slotIndex}
        onChange={(event) => setSlotIndex(Number(event.target.value))}
        className="min-h-8 w-fit rounded-[8px] border border-border bg-card px-2 text-[13px] text-link focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
      >
        {availability.introSlots.map((option, index) => (
          <option key={`${option.weekday}-${option.start}`} value={index}>
            {formatIntroSlot(option)}
          </option>
        ))}
      </select>
      {slot && (
        <IntroCallDialog
          mentorName={mentorName}
          slotLabel={slotLabel}
          onConfirm={() => setConfirmed(slotLabel)}
          trigger={
            <button
              type="button"
              className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, 'text-sm')}
            >
              {PROFILE_TEXT.scheduleCall}
            </button>
          }
        />
      )}
      <p
        role="status"
        className={cn('text-xs font-medium text-success-foreground', !confirmed && 'sr-only')}
      >
        {confirmed ? PROFILE_TEXT.introConfirmed(confirmed) : ''}
      </p>
    </ProfileCard>
  )
}
