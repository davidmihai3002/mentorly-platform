import { cn } from 'cn'
import { DOMAIN_FILTERS, TOP_MENTORS_TEXT } from '../constants'
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
            'inline-flex min-h-[26px] items-center rounded-[13px] border border-transparent bg-tag px-2.5 text-[11px] text-foreground transition-colors hover:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none',
            'aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground',
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
