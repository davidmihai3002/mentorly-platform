import { cn } from 'cn'
import { useId } from 'react'
import { REVIEWS_PAGE_TEXT } from '../constants'
import type { ReviewFilterId, ReviewSortId } from '../types'

type ReviewFiltersProps = {
  filter: ReviewFilterId
  sort: ReviewSortId
  counts: Readonly<Record<ReviewFilterId, number>>
  onFilterChange: (filter: ReviewFilterId) => void
  onSortChange: (sort: ReviewSortId) => void
}

const FILTER_IDS: readonly ReviewFilterId[] = ['all', '5', '4']
const SORT_IDS: readonly ReviewSortId[] = ['recent', 'helpful']
const CHIP_CLASS =
  'inline-flex min-h-[26px] items-center rounded-[13px] bg-tag px-2.5 text-[11px] text-foreground transition-colors focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none'

export function ReviewFilters({
  filter,
  sort,
  counts,
  onFilterChange,
  onSortChange,
}: ReviewFiltersProps) {
  const sortId = useId()

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div
        role="group"
        aria-label={REVIEWS_PAGE_TEXT.filtersLabel}
        className="flex flex-wrap gap-2"
      >
        {FILTER_IDS.map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={filter === id}
            onClick={() => onFilterChange(id)}
            className={cn(
              CHIP_CLASS,
              'aria-pressed:bg-primary aria-pressed:text-primary-foreground',
            )}
          >
            {REVIEWS_PAGE_TEXT.filters[id]}
            {id === 'all' && ` · ${counts.all}`}
          </button>
        ))}
      </div>
      <label htmlFor={sortId} className="sr-only">
        {REVIEWS_PAGE_TEXT.sortLabel}
      </label>
      <select
        id={sortId}
        value={sort}
        onChange={(event) =>
          onSortChange(SORT_IDS.find((id) => id === event.target.value) ?? 'recent')
        }
        className={cn(CHIP_CLASS, 'border-0 pr-1')}
      >
        {SORT_IDS.map((id) => (
          <option key={id} value={id}>
            {REVIEWS_PAGE_TEXT.sorts[id]}
          </option>
        ))}
      </select>
    </div>
  )
}
