import { cn } from 'cn'
import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import { SEARCH_TEXT } from '../constants'

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
      <button type="submit" className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, 'px-8')}>
        {SEARCH_TEXT.search}
      </button>
    </form>
  )
}
