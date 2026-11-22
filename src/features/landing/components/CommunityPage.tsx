import { cn } from 'cn'
import { MessageSquare } from 'lucide-react'
import { AppLink } from '@/components'
import { LAYOUT_CONTAINER_CLASS } from '@/constants'
import { COMMUNITY_QUESTIONS, COMMUNITY_TEXT, HERO_PILL_CLASS, LANDING_LINKS } from '../constants'
import { QuestionCard } from './QuestionCard'

export function CommunityPage() {
  return (
    <section
      aria-labelledby="community-title"
      className={cn(
        LAYOUT_CONTAINER_CLASS,
        'grid flex-1 items-center gap-10 py-12 lg:min-h-[494px] lg:grid-cols-[minmax(0,450px)_minmax(0,374px)] lg:justify-between',
      )}
    >
      <title>{COMMUNITY_TEXT.pageTitle}</title>
      <div>
        <p className="inline-flex h-[27px] items-center rounded-[14px] border border-pill-border bg-tag px-2.5 text-[11px] text-foreground uppercase">
          {COMMUNITY_TEXT.eyebrow}
        </p>
        <h1
          id="community-title"
          className="mt-3.5 text-[clamp(2.25rem,5vw,2.8125rem)] leading-[1.1] font-bold text-foreground"
        >
          {COMMUNITY_TEXT.title}
        </h1>
        <p className="mt-2.5 max-w-[379px] text-lg leading-[1.4] text-foreground">
          {COMMUNITY_TEXT.lead}
        </p>
        <AppLink
          to={LANDING_LINKS.askQuestion}
          className={cn(
            HERO_PILL_CLASS,
            'mt-[5px] border-primary-border bg-primary text-primary-foreground shadow-primary hover:bg-primary/90',
          )}
        >
          {COMMUNITY_TEXT.askQuestion}
          <MessageSquare aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
        </AppLink>
      </div>
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -z-10 hidden aspect-square w-[124%] -translate-1/2 rounded-full border border-backdrop-blob lg:block"
        />
        <ul className="flex flex-col gap-3.5">
          {COMMUNITY_QUESTIONS.map((question) => (
            <li key={question.id}>
              <QuestionCard question={question} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
