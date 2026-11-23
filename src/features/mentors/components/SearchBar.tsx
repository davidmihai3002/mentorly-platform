import { cn } from 'cn'
import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { ChoiceDialog } from '@/components'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import { DEMO_SEARCH, DEMO_SEARCH_ALL, SEARCH_TEXT } from '../constants'

const SEARCH_BUTTON_CLASS = cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, 'px-8')

type SearchBarProps = {
  initialQuery: string
  onSearch: (query: string) => void
}

export function SearchBar({ initialQuery, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch(query)
  }

  function handleDemoChoice(choice: string) {
    const next = choice === DEMO_SEARCH_ALL ? '' : choice
    setQuery(next)
    onSearch(next)
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="flex gap-2.5">
      <label className="relative flex-1">
        <span className="sr-only">{SEARCH_TEXT.searchLabel}</span>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="search"
          value={query}
          maxLength={80}
          placeholder={SEARCH_TEXT.searchPlaceholder}
          onChange={(event) => setQuery(event.target.value)}
          className="h-10 w-full rounded-[24px] border border-border bg-card pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        />
      </label>
      {query.trim() ? (
        <button type="submit" className={SEARCH_BUTTON_CLASS}>
          {SEARCH_TEXT.search}
        </button>
      ) : (
        <ChoiceDialog
          title={DEMO_SEARCH.title}
          options={DEMO_SEARCH.options}
          onChange={handleDemoChoice}
          trigger={
            <button type="button" className={SEARCH_BUTTON_CLASS}>
              {SEARCH_TEXT.search}
            </button>
          }
        />
      )}
    </form>
  )
}
