import { cn } from 'cn'
import { useId } from 'react'
import { AppLink } from '@/components'
import {
  ROUNDED_BUTTON_CLASS,
  ROUNDED_OUTLINE_CLASS,
  ROUNDED_PRIMARY_CLASS,
  ROUTES,
} from '@/constants'
import { QUIZ_CARD_CLASS, QUIZ_TAG_CLASS, QUIZ_TEXT } from '../constants'
import { QuizIntroStepTiles } from './QuizIntroStepTiles'
import { QuizPageHeader } from './QuizPageHeader'

type QuizIntroProps = {
  shouldFocus: boolean
  onStart: () => void
}

export function QuizIntro({ shouldFocus, onStart }: QuizIntroProps) {
  const headlineId = useId()
  return (
    <div className="flex flex-col gap-6">
      <QuizPageHeader
        title={QUIZ_TEXT.introTitle}
        subtitle={QUIZ_TEXT.introSubtitle}
        shouldFocus={shouldFocus}
      />
      <section
        aria-labelledby={headlineId}
        className={cn(QUIZ_CARD_CLASS, 'flex flex-col gap-5 sm:p-8')}
      >
        <span className={cn(QUIZ_TAG_CLASS, 'w-fit uppercase')}>{QUIZ_TEXT.introBadge}</span>
        <h2
          id={headlineId}
          className="max-w-[400px] text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.15] font-bold tracking-[-0.02em] text-foreground"
        >
          {QUIZ_TEXT.introHeadline}
        </h2>
        <p className="text-base leading-[1.45] text-foreground">{QUIZ_TEXT.introLead}</p>
        <QuizIntroStepTiles />
        <p className="text-xs text-muted-foreground">{QUIZ_TEXT.introNote}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onStart}
            className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}
          >
            {QUIZ_TEXT.start} <span aria-hidden="true">→</span>
          </button>
          <AppLink
            to={ROUTES.mentors}
            className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'text-sm')}
          >
            {QUIZ_TEXT.exploreMentors}
          </AppLink>
        </div>
      </section>
      <section className="rounded-[14px] border border-border bg-selected/70 p-5">
        <h2 className="text-lg font-bold tracking-[-0.02em] text-foreground">
          {QUIZ_TEXT.explainedTitle}
        </h2>
        <p className="mt-1.5 text-[13px] text-foreground">{QUIZ_TEXT.explainedText}</p>
      </section>
    </div>
  )
}
