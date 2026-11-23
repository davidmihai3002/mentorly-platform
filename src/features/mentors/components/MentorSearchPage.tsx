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
        <FiltersPanel
          key={mentorSearch.searchKey}
          initialFilters={search.filters}
          onApply={mentorSearch.applyFilters}
          onReset={mentorSearch.resetFilters}
        />
        <section aria-label={SEARCH_TEXT.title} className="flex flex-col gap-4">
          <ResultsToolbar
            count={mentorSearch.results.length}
            sort={search.sort}
            view={search.view}
            onSortChange={mentorSearch.setSort}
            onViewChange={mentorSearch.setView}
          />
          <ActiveFilterChips
            filters={describeFilters(search.filters)}
            onRemove={mentorSearch.removeFilter}
          />
          <MentorResults mentors={mentorSearch.results} view={search.view} />
        </section>
      </div>
    </div>
  )
}
