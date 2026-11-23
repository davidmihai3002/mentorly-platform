import { cn } from 'cn'
import { useId, useState } from 'react'
import { AppLink, MentorCard } from '@/components'
import {
  ROUNDED_BUTTON_CLASS,
  ROUNDED_OUTLINE_CLASS,
  ROUNDED_PRIMARY_CLASS,
  ROUTES,
} from '@/constants'
import { getMentorProfilePath } from '@/utils'
import { QUIZ_CARD_CLASS, QUIZ_MENTORS, TOP_MENTORS_TEXT } from '../constants'
import type { DomainFilterId } from '../types'
import { filterTopMentors } from '../utils'
import { DomainFilter } from './DomainFilter'
import { QuizPageHeader } from './QuizPageHeader'

export function TopMentorsPage() {
  const [filterId, setFilterId] = useState<DomainFilterId>('all')
  const mentors = filterTopMentors(QUIZ_MENTORS, filterId)
  const progressTitleId = useId()

  return (
    <div className="flex flex-col gap-6">
      <title>{TOP_MENTORS_TEXT.pageTitle}</title>
      <QuizPageHeader title={TOP_MENTORS_TEXT.title} subtitle={TOP_MENTORS_TEXT.subtitle} />
      <DomainFilter activeId={filterId} onChange={setFilterId} />
      <p role="status" className="sr-only">
        {TOP_MENTORS_TEXT.resultCount(mentors.length)}
      </p>
      <div>
        {mentors.length > 0 ? (
          <ul className="grid gap-4 md:grid-cols-3">
            {mentors.map((mentor) => (
              <li key={mentor.id} className="flex flex-col">
                <MentorCard
                  mentor={mentor}
                  headingLevel="h2"
                  profileHref={getMentorProfilePath(mentor.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">{TOP_MENTORS_TEXT.empty}</p>
        )}
      </div>
      <section
        aria-labelledby={progressTitleId}
        className={cn(QUIZ_CARD_CLASS, 'flex flex-col gap-2')}
      >
        <h2
          id={progressTitleId}
          className="text-[22px] leading-[1.2] font-bold tracking-[-0.02em] text-foreground"
        >
          {TOP_MENTORS_TEXT.progressTitle}
        </h2>
        <p className="text-[13px] text-muted-foreground">{TOP_MENTORS_TEXT.progressText}</p>
      </section>
      <div className="grid gap-3 sm:grid-cols-2">
        <AppLink to={ROUTES.quiz} className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}>
          {TOP_MENTORS_TEXT.findMatch}
        </AppLink>
        <AppLink
          to={ROUTES.mentors}
          className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'text-sm')}
        >
          {TOP_MENTORS_TEXT.exploreAll}
        </AppLink>
      </div>
    </div>
  )
}
