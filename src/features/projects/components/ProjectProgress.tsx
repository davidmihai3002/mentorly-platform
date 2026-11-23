import { PROJECTS_TEXT } from '../constants'
import type { ProjectStage } from '../types'
import { countStages } from '../utils'

type ProjectProgressProps = {
  stages: readonly ProjectStage[]
}

export function ProjectProgress({ stages }: ProjectProgressProps) {
  const { done, total, percent } = countStages(stages)
  const label = PROJECTS_TEXT.progress(done, total)

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex justify-between text-xs">
        <span className="font-semibold text-foreground">{label}</span>
        <span className="font-semibold text-primary">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-label={PROJECTS_TEXT.progressLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={label}
        className="h-1.5 overflow-hidden rounded-full bg-track"
      >
        <span className="block h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
      <ul
        aria-label={PROJECTS_TEXT.stagesLabel}
        className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-foreground"
      >
        {stages.map((stage) => (
          <li key={stage.label}>
            <span aria-hidden="true">{stage.isDone ? '✓ ' : '○ '}</span>
            {stage.label}
            <span className="sr-only">
              , {stage.isDone ? PROJECTS_TEXT.stageDone : PROJECTS_TEXT.stagePending}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
