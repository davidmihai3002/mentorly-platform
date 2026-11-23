import { AppLink } from '@/components'
import { ROUTES } from '@/constants'
import { SEARCH_TEXT } from '../constants'
import type { ViewId } from '../types'

type SearchHeaderProps = {
  view: ViewId
}

const HEADER_LINK_CLASS =
  'rounded-sm text-[13px] font-medium text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none'

export function SearchHeader({ view }: SearchHeaderProps) {
  return (
    <header className="flex flex-col gap-1.5">
      <h1 className="text-[clamp(1.5rem,4vw,1.8125rem)] leading-[1.2] font-bold tracking-[-0.02em] text-foreground">
        {SEARCH_TEXT.title}
      </h1>
      <p className="text-sm tracking-[-0.02em] text-muted-foreground">
        {view === 'grid' ? SEARCH_TEXT.gridSubtitle : SEARCH_TEXT.listSubtitle}
      </p>
      <nav className="flex gap-5">
        <AppLink to={ROUTES.topMentors} className={HEADER_LINK_CLASS}>
          {SEARCH_TEXT.topMentors} <span aria-hidden="true">→</span>
        </AppLink>
        <AppLink to={ROUTES.quiz} className={HEADER_LINK_CLASS}>
          {SEARCH_TEXT.quiz} <span aria-hidden="true">→</span>
        </AppLink>
      </nav>
    </header>
  )
}
