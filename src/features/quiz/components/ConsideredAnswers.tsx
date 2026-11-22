import { cn } from 'cn'
import { QUIZ_CARD_CLASS, QUIZ_TAG_CLASS, RESULTS_TEXT } from '../constants'

type ConsideredAnswersProps = {
  summaries: readonly string[]
}

export function ConsideredAnswers({ summaries }: ConsideredAnswersProps) {
  return (
    <section
      aria-labelledby="considered-title"
      className={cn(QUIZ_CARD_CLASS, 'flex flex-col gap-3')}
    >
      <h2 id="considered-title" className="text-lg font-bold tracking-[-0.02em] text-foreground">
        {RESULTS_TEXT.consideredTitle}
      </h2>
      {summaries.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {summaries.map((summary) => (
            <li key={summary} className={QUIZ_TAG_CLASS}>
              {summary}
            </li>
          ))}
        </ul>
      )}
      <p className="text-xs text-muted-foreground">{RESULTS_TEXT.consideredNote}</p>
    </section>
  )
}
