import { cn } from 'cn'
import { SlidersHorizontal } from 'lucide-react'
import { useId, useState } from 'react'
import { SEARCH_TEXT } from '../constants'
import { useMentorSearch } from '../hooks'
import { describeFilters } from '../utils'
import { ActiveFilterChips } from './ActiveFilterChips'
import { FiltersPanel } from './FiltersPanel'
import { MentorResults } from './MentorResults'
import { ResultsToolbar } from './ResultsToolbar'
import { SearchBar } from './SearchBar'
import { SearchHeader } from './SearchHeader'

export function MentorSearchPage() {
  const mentorSearch = useMentorSearch()
  const { search } = mentorSearch
  const filtersId = useId()
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const activeFilters = describeFilters(search.filters)

  return (
    <div className="flex flex-col gap-6">
      <title>{SEARCH_TEXT.pageTitle}</title>
      <SearchHeader view={search.view} />
      <SearchBar
        key={`q-${search.query}`}
        initialQuery={search.query}
        onSearch={mentorSearch.setQuery}
      />
      <div className="grid items-start gap-5 lg:grid-cols-[210px_minmax(0,1fr)]">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            aria-expanded={isFiltersOpen}
            aria-controls={filtersId}
            onClick={() => setIsFiltersOpen((current) => !current)}
            className="inline-flex min-h-10 w-fit items-center gap-2 rounded-[20px] border border-border bg-card px-4 text-sm font-semibold text-foreground hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none lg:hidden"
          >
            <SlidersHorizontal aria-hidden="true" className="size-4" />
            {SEARCH_TEXT.filtersToggle(activeFilters.length)}
          </button>
          <FiltersPanel
            id={filtersId}
            className={cn(!isFiltersOpen && 'max-lg:hidden')}
            key={mentorSearch.searchKey}
            initialFilters={search.filters}
            onApply={mentorSearch.applyFilters}
            onReset={mentorSearch.resetFilters}
          />
        </div>
        <section aria-label={SEARCH_TEXT.title} className="flex flex-col gap-4">
          <ResultsToolbar
            count={mentorSearch.results.length}
            sort={search.sort}
            view={search.view}
            onSortChange={mentorSearch.setSort}
            onViewChange={mentorSearch.setView}
          />
          <ActiveFilterChips filters={activeFilters} onRemove={mentorSearch.removeFilter} />
          <MentorResults mentors={mentorSearch.results} view={search.view} />
        </section>
      </div>
    </div>
  )
}
