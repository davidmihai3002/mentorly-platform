import { cn } from 'cn'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import { useId } from 'react'
import { COMMUNITY_TEXT, LANDING_CARD_CLASS } from '../constants'
import type { CommunityQuestion } from '../types'
import { PersonAvatar } from './PersonAvatar'
import { Pill } from './Pill'

type QuestionCardProps = {
  question: CommunityQuestion
}

export function QuestionCard({ question }: QuestionCardProps) {
  const titleId = useId()

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        LANDING_CARD_CLASS,
        'w-full rounded-[15px] border-tag p-[18px] shadow-card-wide',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Pill size="sm" hasBorder className="bg-tag font-medium">
          {question.category}
        </Pill>
        <span className="text-[10px] text-muted-foreground">{question.postedAt}</span>
      </div>
      <h2 id={titleId} className="mt-3 text-[17px] leading-[1.15] font-medium text-foreground">
        {question.title}
      </h2>
      <p className="mt-1.5 line-clamp-2 text-xs leading-[1.35] text-foreground">
        {question.excerpt}
      </p>
      <div className="mt-3 flex items-center gap-2.5 border-t border-border pt-3">
        <PersonAvatar person={question.answeredBy} />
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-1.5 text-[10px] text-foreground">
            {COMMUNITY_TEXT.answeredBy} {question.answeredBy.name}
            <BadgeCheck aria-hidden="true" className="size-3.5 text-primary" />
            <span className="sr-only">{COMMUNITY_TEXT.verified}</span>
            <span
              aria-hidden="true"
              className="rounded-full bg-tag px-1.5 py-0.5 text-[9px] font-medium"
            >
              {COMMUNITY_TEXT.mentorTag}
            </span>
          </p>
          <p className="mt-0.5 text-[9px] text-muted-foreground">
            {COMMUNITY_TEXT.stats(question.answerCount, question.likeCount)}
          </p>
        </div>
        <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-foreground" />
      </div>
    </article>
  )
}
