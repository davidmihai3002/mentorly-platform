import { cn } from 'cn'
import { QUIZ_STEPS, QUIZ_TEXT } from '../constants'

type QuizProgressProps = {
  stepIndex: number
}

export function QuizProgress({ stepIndex }: QuizProgressProps) {
  const total = QUIZ_STEPS.length
  const current = stepIndex + 1
  const stepLabel = QUIZ_STEPS[stepIndex]?.label ?? ''
  const label = QUIZ_TEXT.stepOf(current, total)

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between text-[13px] tracking-[-0.02em]">
        <span className="font-medium text-link">{label}</span>
        <span className="text-muted-foreground">{stepLabel}</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-valuetext={`${label}: ${stepLabel}`}
        style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
        className="grid gap-1.5"
      >
        {QUIZ_STEPS.map((step, index) => (
          <span
            key={step.id}
            className={cn(
              'h-1.5 rounded-[3px] transition-colors duration-(--motion-duration)',
              index <= stepIndex ? 'bg-primary' : 'bg-track',
            )}
          />
        ))}
      </div>
    </div>
  )
}
