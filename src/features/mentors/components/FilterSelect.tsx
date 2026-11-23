import { useId } from 'react'
import { FILTER_LABELS, FILTER_OPTIONS, SEARCH_FIELD_CLASS, SEARCH_TEXT } from '../constants'
import type { FilterKey } from '../types'

type FilterSelectProps = {
  filterKey: FilterKey
  value?: string
  onChange: (value: string | undefined) => void
}

export function FilterSelect({ filterKey, value, onChange }: FilterSelectProps) {
  const id = useId()

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-semibold tracking-[-0.02em] text-foreground">
        {FILTER_LABELS[filterKey]}
      </label>
      <select
        id={id}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value || undefined)}
        className={SEARCH_FIELD_CLASS}
      >
        <option value="">{SEARCH_TEXT.anyOption}</option>
        {FILTER_OPTIONS[filterKey].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
