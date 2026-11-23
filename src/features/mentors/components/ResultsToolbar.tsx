import { useId } from 'react'
import { SEARCH_TEXT, SORT_OPTIONS } from '../constants'
import type { SortId, ViewId } from '../types'
import { ViewToggle } from './ViewToggle'

type ResultsToolbarProps = {
  count: number
  sort: SortId
  view: ViewId
  onSortChange: (sort: SortId) => void
  onViewChange: (view: ViewId) => void
}

export function ResultsToolbar({
  count,
  sort,
  view,
  onSortChange,
  onViewChange,
}: ResultsToolbarProps) {
  const sortId = useId()

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p role="status" className="text-sm font-semibold tracking-[-0.02em] text-foreground">
        {SEARCH_TEXT.resultCount(count)}
      </p>
      <div className="flex items-center gap-2">
        <label htmlFor={sortId} className="sr-only">
          {SEARCH_TEXT.sortLabel}
        </label>
        <select
          id={sortId}
          value={sort}
          onChange={(event) =>
            onSortChange(
              SORT_OPTIONS.find((option) => option.value === event.target.value)?.value ??
                'relevance',
            )
          }
          className="h-7 rounded-[14px] border border-border bg-card px-2.5 text-[11px] text-foreground focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ViewToggle view={view} onChange={onViewChange} />
      </div>
    </div>
  )
}
