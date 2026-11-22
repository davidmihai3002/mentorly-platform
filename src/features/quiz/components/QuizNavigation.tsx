import { cn } from 'cn'
import { ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import { QUIZ_TEXT } from '../constants'

type QuizNavigationProps = {
  isLastStep: boolean
  onBack: () => void
}

export function QuizNavigation({ isLastStep, onBack }: QuizNavigationProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={onBack}
        className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_OUTLINE_CLASS, 'text-sm')}
      >
        <span aria-hidden="true">←</span> {QUIZ_TEXT.back}
      </button>
      <button type="submit" className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}>
        {isLastStep ? QUIZ_TEXT.seeResults : QUIZ_TEXT.next} <span aria-hidden="true">→</span>
      </button>
    </div>
  )
}
