import { useId } from 'react'
import { OptionCard } from '@/components'
import { QUIZ_TEXT } from '../constants'
import type { QuizStep } from '../types'

type QuizQuestionProps = {
  step: QuizStep
  value?: string
  hasMissingAnswer: boolean
  onSelect: (value: string) => void
}

export function QuizQuestion({ step, value, hasMissingAnswer, onSelect }: QuizQuestionProps) {
  const hintId = useId()
  const errorId = useId()

  return (
    <fieldset
      aria-describedby={hasMissingAnswer ? `${hintId} ${errorId}` : hintId}
      className="flex flex-col gap-3.5"
    >
      <legend className="contents">
        <span className="block text-[23px] leading-[1.2] font-bold tracking-[-0.02em] text-foreground">
          {step.question}
        </span>
      </legend>
      <p id={hintId} className="-mt-1 text-xs text-muted-foreground">
        {step.hint}
      </p>
      {step.options.map((option) => (
        <OptionCard
          key={option.value}
          name={step.id}
          value={option.value}
          title={option.title}
          description={option.description}
          checked={value === option.value}
          size="regular"
          onChange={() => onSelect(option.value)}
        />
      ))}
      {hasMissingAnswer && (
        <p id={errorId} role="alert" className="text-[13px] font-medium text-destructive">
          {QUIZ_TEXT.missingAnswer}
        </p>
      )}
    </fieldset>
  )
}
