import { cn } from 'cn'
import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { AppLink, MentorCard, MentorPreviewDialog } from '@/components'
import {
  ROUNDED_BUTTON_CLASS,
  ROUNDED_OUTLINE_CLASS,
  ROUNDED_PRIMARY_CLASS,
  ROUTES,
} from '@/constants'
import { getMentorProfilePath } from '@/utils'
import { QUIZ_MENTORS, RESULTS_TEXT } from '../constants'
import {
  hasAnyAnswer,
  parseQuizAnswers,
  recommendMentors,
  summarizeAnswers,
  toQuizSearch,
} from '../utils'
import { ConsideredAnswers } from './ConsideredAnswers'
import { MatchReasonsCard } from './MatchReasonsCard'
import { QuizPageHeader } from './QuizPageHeader'
import type { Mentor } from '@/types'

export function QuizResultsPage() {
  const [previewMentor, setPreviewMentor] = useState<Mentor | null>(null)
  const [searchParams] = useSearchParams()
  const answers = parseQuizAnswers(searchParams)
  const recommendations = recommendMentors(answers, QUIZ_MENTORS)

  return (
    <div className="flex flex-col gap-6">
      <title>{RESULTS_TEXT.pageTitle}</title>
      <MentorPreviewDialog mentor={previewMentor} onClose={() => setPreviewMentor(null)} />
      <QuizPageHeader
        title={RESULTS_TEXT.title}
        subtitle={hasAnyAnswer(answers) ? RESULTS_TEXT.subtitle : RESULTS_TEXT.generalSubtitle}
      />
      <ConsideredAnswers summaries={summarizeAnswers(answers)} />
      <ul className="grid gap-4 md:grid-cols-3">
        {recommendations.map((mentor) => (
          <li key={mentor.id} className="flex flex-col gap-3">
            <MentorCard
              onApply={() => setPreviewMentor(mentor)}
              mentor={mentor}
              headingLevel="h2"
              profileHref={getMentorProfilePath(mentor.id)}
              className="flex-1"
            />
            <MatchReasonsCard mentor={mentor} />
          </li>
        ))}
      </ul>
      <div className="grid gap-3 sm:grid-cols-2">
        <AppLink
          to={`${ROUTES.quiz}${toQuizSearch(answers)}`}
          className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'text-sm')}
        >
          {RESULTS_TEXT.adjustAnswers}
        </AppLink>
        <AppLink to={ROUTES.mentors} className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}>
          {RESULTS_TEXT.exploreAll}
        </AppLink>
      </div>
      <p className="text-xs text-muted-foreground">{RESULTS_TEXT.disclaimer}</p>
    </div>
  )
}
