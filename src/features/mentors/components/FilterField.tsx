import { ChevronDown } from 'lucide-react'
import { useId } from 'react'
import { ChoiceDialog } from '@/components'
import {
  ANY_VALUE,
  FILTER_DIALOG_TITLES,
  FILTER_LABELS,
  FILTER_OPTIONS,
  FILTER_TRIGGER_CLASS,
  SEARCH_TEXT,
} from '../constants'
import type { FilterKey } from '../types'

type FilterFieldProps = {
  filterKey: FilterKey
  value?: string
  onChange: (value: string) => void
}

export function FilterField({ filterKey, value, onChange }: FilterFieldProps) {
  const labelId = useId()
  const valueId = useId()
  const options = FILTER_OPTIONS[filterKey]
  const hasAnyOption = options.some((option) => option.value === ANY_VALUE)
  const shownValue = value ?? (hasAnyOption ? ANY_VALUE : undefined)
  const selected = options.find((option) => option.value === shownValue)

  return (
    <div className="flex flex-col gap-2">
      <span id={labelId} className="text-[13px] font-semibold tracking-[-0.02em] text-foreground">
        {FILTER_LABELS[filterKey]}
      </span>
      <ChoiceDialog
        title={FILTER_DIALOG_TITLES[filterKey]}
        options={options}
        value={shownValue}
        onChange={onChange}
        trigger={
          <button
            type="button"
            aria-labelledby={`${labelId} ${valueId}`}
            className={FILTER_TRIGGER_CLASS}
          >
            <span id={valueId} className={selected ? undefined : 'text-muted-foreground'}>
              {selected?.label ?? SEARCH_TEXT.anyOption}
            </span>
            <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
          </button>
        }
      />
    </div>
  )
}
