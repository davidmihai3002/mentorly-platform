import { cn } from 'cn'
import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { ChoiceDialog } from '@/components'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import { ANY_VALUE, DEMO_SEARCH_TITLE, SEARCH_TEXT } from '../constants'
import { getDemoSearchOptions } from '../utils'

type SearchBarProps = {
  initialQuery: string
  onSearch: (query: string) => void
}

const DEMO_OPTIONS = getDemoSearchOptions()

export function SearchBar({ initialQuery, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (query.trim()) {
      onSearch(query)
      return
    }
    setIsDemoOpen(true)
  }

  function handleDemoChoice(choice: string) {
    const next = choice === ANY_VALUE ? '' : choice
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
      <button type="submit" className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, 'px-8')}>
        {SEARCH_TEXT.search}
      </button>
      <ChoiceDialog
        title={DEMO_SEARCH_TITLE}
        options={DEMO_OPTIONS}
        open={isDemoOpen}
        onOpenChange={setIsDemoOpen}
        onChange={handleDemoChoice}
      />
    </form>
  )
}
