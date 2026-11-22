import { QUIZ_STEPS } from '../constants'

export function QuizIntroStepTiles() {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {QUIZ_STEPS.map((step, index) => (
        <li
          key={step.id}
          className="flex flex-col gap-1 rounded-[12px] border border-border bg-background/60 px-4 py-3"
        >
          <span className="text-[13px] font-semibold tracking-[-0.02em] text-link">
            {String(index + 1).padStart(2, '0')} · {step.label}
          </span>
          <span className="text-xs text-muted-foreground">{step.teaser}</span>
        </li>
      ))}
    </ol>
  )
}
