import { cn } from 'cn'
import type { FormEvent } from 'react'
import { AppLink } from '@/components'
import { QUIZ_CARD_CLASS, QUIZ_TEXT, QUIZ_TEXT_LINK_CLASS } from '../constants'
import type { UseQuizResult } from '../hooks'
import type { QuizStep } from '../types'
import { InterestPicker } from './InterestPicker'
import { QuizNavigation } from './QuizNavigation'
import { QuizPageHeader } from './QuizPageHeader'
import { QuizPreferenceTags } from './QuizPreferenceTags'
import { QuizProgress } from './QuizProgress'
import { QuizQuestion } from './QuizQuestion'

type QuizStepViewProps = {
  quiz: UseQuizResult
  step: QuizStep
  stepIndex: number
  skipHref: string
  onNext: () => void
}

export function QuizStepView({ quiz, step, stepIndex, skipHref, onNext }: QuizStepViewProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onNext()
  }

  return (
    <div className="flex flex-col gap-5">
      <QuizPageHeader title={step.title} subtitle={step.subtitle} shouldFocus />
      <QuizProgress stepIndex={stepIndex} />
      <form
        noValidate
        onSubmit={handleSubmit}
        className={cn(QUIZ_CARD_CLASS, 'flex flex-col gap-3.5')}
      >
        <QuizQuestion
          step={step}
          value={quiz.answers[step.id]}
          missingAnswerCount={quiz.missingAnswerCount}
          onSelect={(value) => quiz.select(step.id, value)}
        />
        {step.id === 'domain' && (
          <InterestPicker selected={quiz.answers.interests} onToggle={quiz.toggleInterest} />
        )}
        {step.id === 'pace' && <QuizPreferenceTags />}
        <QuizNavigation isLastStep={quiz.isLastStep} onBack={quiz.back} />
        {quiz.isLastStep && (
          <AppLink to={skipHref} className={QUIZ_TEXT_LINK_CLASS}>
            {QUIZ_TEXT.skipStep} <span aria-hidden="true">→</span> {QUIZ_TEXT.generalResults}
          </AppLink>
        )}
      </form>
    </div>
  )
}
