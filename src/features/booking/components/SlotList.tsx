import { cn } from 'cn'
import { BOOKING_TEXT } from '../constants'
import type { TimeSlot } from '../types'

type SlotListProps = {
  slots: readonly TimeSlot[]
  selectedStart?: string
  onSelect: (start: string) => void
}

export function SlotList({ slots, selectedStart, onSelect }: SlotListProps) {
  if (slots.length === 0) {
    return <p className="text-sm text-muted-foreground">{BOOKING_TEXT.noSlots}</p>
  }

  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="sr-only">{BOOKING_TEXT.slotsLabel}</legend>
      {slots.map((slot) => (
        <label
          key={slot.start}
          className={cn(
            'flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-[20px] border border-border px-4 text-sm transition-colors',
            'has-checked:border-primary has-checked:bg-primary has-checked:font-semibold has-checked:text-primary-foreground has-checked:shadow-primary',
            'has-focus-visible:ring-3 has-focus-visible:ring-ring',
            'has-disabled:cursor-not-allowed has-disabled:justify-start has-disabled:rounded-[12px] has-disabled:bg-background has-disabled:text-xs has-disabled:text-muted-foreground',
          )}
        >
          <input
            type="radio"
            name="slot"
            value={slot.start}
            checked={selectedStart === slot.start}
            disabled={slot.isBusy}
            onChange={() => onSelect(slot.start)}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className="hidden size-1.5 rounded-full bg-current peer-checked:inline-block"
          />
          {slot.start}–{slot.end}
          {slot.isBusy && <span>· {BOOKING_TEXT.busy}</span>}
        </label>
      ))}
    </fieldset>
  )
}
