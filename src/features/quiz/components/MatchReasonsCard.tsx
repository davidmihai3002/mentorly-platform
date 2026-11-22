import { RESULTS_TEXT } from '../constants'
import type { QuizMentor } from '../types'

type MatchReasonsCardProps = {
  mentor: QuizMentor
}

export function MatchReasonsCard({ mentor }: MatchReasonsCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-[14px] border border-border-soft bg-selected/70 p-4">
      <p className="text-[13px] font-bold tracking-[-0.02em] text-link">
        {RESULTS_TEXT.whyMatchTitle}
      </p>
      <ul className="flex flex-col gap-0.5 text-[13px] text-foreground">
        {mentor.reasons.map((reason) => (
          <li key={reason}>
            <span aria-hidden="true">✓ </span>
            {reason}
          </li>
        ))}
      </ul>
      <p className="mt-1 text-[11px] text-muted-foreground">
        {RESULTS_TEXT.experience(mentor.experienceYears)}
      </p>
    </div>
  )
}
