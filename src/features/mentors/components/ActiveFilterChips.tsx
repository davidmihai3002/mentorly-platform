import { X } from 'lucide-react'
import { SEARCH_TEXT } from '../constants'
import type { ActiveFilter, FilterKey } from '../types'

type ActiveFilterChipsProps = {
  filters: readonly ActiveFilter[]
  onRemove: (key: FilterKey) => void
}

export function ActiveFilterChips({ filters, onRemove }: ActiveFilterChipsProps) {
  if (filters.length === 0) return null

  return (
    <ul aria-label={SEARCH_TEXT.activeFilters} className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <li key={filter.key}>
          <button
            type="button"
            aria-label={SEARCH_TEXT.removeFilter(filter.label)}
            onClick={() => onRemove(filter.key)}
            className="inline-flex min-h-[26px] items-center gap-1 rounded-[13px] bg-tag px-2.5 text-[11px] text-foreground transition-colors hover:bg-selected focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
          >
            {filter.label}
            <X aria-hidden="true" className="size-3" />
          </button>
        </li>
      ))}
    </ul>
  )
}
