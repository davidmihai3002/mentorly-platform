import { cn } from 'cn'
import { DOMAIN_FILTERS, QUIZ_TAG_CLASS, TOP_MENTORS_TEXT } from '../constants'
import type { DomainFilterId } from '../types'

type DomainFilterProps = {
  activeId: DomainFilterId
  onChange: (filterId: DomainFilterId) => void
}

export function DomainFilter({ activeId, onChange }: DomainFilterProps) {
  return (
    <div role="group" aria-label={TOP_MENTORS_TEXT.filterLabel} className="flex flex-wrap gap-2">
      {DOMAIN_FILTERS.map((filter) => (
        <button
          key={filter.id}
          type="button"
          aria-pressed={filter.id === activeId}
          onClick={() => onChange(filter.id)}
          className={cn(
            QUIZ_TAG_CLASS,
            'border border-transparent transition-colors hover:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none',
            'aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground',
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
