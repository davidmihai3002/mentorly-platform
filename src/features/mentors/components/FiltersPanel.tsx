import { cn } from 'cn'
import { useState, type FormEvent } from 'react'
import { ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import { ANY_VALUE, FILTER_LABELS, SEARCH_PANEL_CLASS, SEARCH_TEXT } from '../constants'
import type { FilterKey, MentorFilters } from '../types'
import { FilterSelect } from './FilterSelect'

type FiltersPanelProps = {
  initialFilters: MentorFilters
  onApply: (filters: MentorFilters) => void
  onReset: () => void
  id?: string
  className?: string
}

const FILTER_KEYS = Object.keys(FILTER_LABELS) as FilterKey[]
const NUMERIC_KEYS: readonly FilterKey[] = ['maxPrice', 'minRating']

export function FiltersPanel({
  initialFilters,
  onApply,
  onReset,
  id,
  className,
}: FiltersPanelProps) {
  const [draft, setDraft] = useState(initialFilters)

  function handleChange(key: FilterKey, value: string | undefined) {
    const isAny = value === ANY_VALUE
    const parsed =
      value === undefined || isAny ? undefined : NUMERIC_KEYS.includes(key) ? Number(value) : value
    setDraft((current) => ({ ...current, [key]: parsed }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onApply(draft)
  }

  return (
    <form
      aria-labelledby="filters-title"
      onSubmit={handleSubmit}
      id={id}
      className={cn(SEARCH_PANEL_CLASS, 'flex flex-col gap-4 p-5', className)}
    >
      <h2 id="filters-title" className="text-xl font-bold tracking-[-0.02em] text-foreground">
        {SEARCH_TEXT.filtersTitle}
      </h2>
      {FILTER_KEYS.map((key) => (
        <FilterSelect
          key={key}
          filterKey={key}
          value={draft[key] === undefined ? undefined : String(draft[key])}
          onChange={(value) => handleChange(key, value)}
        />
      ))}
      <button type="submit" className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, 'mt-1')}>
        {SEARCH_TEXT.apply}
      </button>
      <button
        type="button"
        onClick={onReset}
        className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'text-sm')}
      >
        {SEARCH_TEXT.reset}
      </button>
    </form>
  )
}
