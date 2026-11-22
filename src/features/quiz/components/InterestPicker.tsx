import { cn } from 'cn'
import { Check } from 'lucide-react'
import { INTERESTS, QUIZ_TAG_CLASS, QUIZ_TEXT } from '../constants'
import type { InterestId } from '../types'

type InterestPickerProps = {
  selected: readonly InterestId[]
  onToggle: (interest: InterestId) => void
}

export function InterestPicker({ selected, onToggle }: InterestPickerProps) {
  return (
    <fieldset className="flex flex-col gap-2.5">
      <legend className="mb-2.5 text-[13px] font-semibold tracking-[-0.02em] text-foreground">
        {QUIZ_TEXT.interestsLegend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {INTERESTS.map((interest) => (
          <label
            key={interest.id}
            className={cn(
              QUIZ_TAG_CLASS,
              'cursor-pointer gap-1.5 border border-transparent has-checked:border-primary has-focus-visible:ring-3 has-focus-visible:ring-ring',
            )}
          >
            <input
              type="checkbox"
              checked={selected.includes(interest.id)}
              onChange={() => onToggle(interest.id)}
              className="peer sr-only"
            />
            <span
              aria-hidden="true"
              className="grid size-3 place-items-center rounded-[3px] border border-foreground/60 bg-card text-card peer-checked:border-primary peer-checked:bg-primary"
            >
              <Check className="size-2.5" strokeWidth={3} />
            </span>
            {interest.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
