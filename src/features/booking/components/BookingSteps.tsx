import { cn } from 'cn'
import { STEPS_TEXT } from '../constants'

type BookingStepsProps = {
  current: number
}

export function BookingSteps({ current }: BookingStepsProps) {
  return (
    <nav aria-label={STEPS_TEXT.label}>
      <ol className="flex flex-wrap items-center gap-2 text-xs text-link">
        {STEPS_TEXT.steps.map((step, index) => (
          <li key={step} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">→</span>}
            <span
              aria-current={index === current ? 'step' : undefined}
              className={cn(index === current && 'font-semibold underline underline-offset-4')}
            >
              {index + 1} · {step}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  )
}
