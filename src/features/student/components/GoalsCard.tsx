import { cn } from 'cn'
import { Circle, CircleCheck } from 'lucide-react'
import { AppLink } from '@/components'
import { ROUNDED_BUTTON_CLASS, ROUTES } from '@/constants'
import { LEARNING_GOALS, STUDENT_PROFILE_TEXT } from '../constants'
import { getGoalProgress } from '../utils'
import { SectionCard } from './SectionCard'

export function GoalsCard() {
  const { done, total, percent } = getGoalProgress(LEARNING_GOALS)

  return (
    <SectionCard
      title={STUDENT_PROFILE_TEXT.goalsTitle}
      aside={<span className="text-xl font-bold text-primary">{percent}%</span>}
    >
      <p className="text-xs text-muted-foreground">{STUDENT_PROFILE_TEXT.goalsMeta(done, total)}</p>
      <div
        role="progressbar"
        aria-label={STUDENT_PROFILE_TEXT.progressLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={STUDENT_PROFILE_TEXT.goalsMeta(done, total)}
        className="h-1.5 overflow-hidden rounded-full bg-track"
      >
        <span className="block h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
      </div>
      <ul className="flex flex-col gap-3">
        {LEARNING_GOALS.map((goal) => {
          const Icon = goal.status === 'done' ? CircleCheck : Circle
          return (
            <li key={goal.title} className="flex items-start gap-2.5">
              <Icon
                aria-hidden="true"
                className={cn(
                  'mt-0.5 size-4 shrink-0',
                  goal.status === 'done' ? 'text-primary' : 'text-foreground',
                )}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-foreground">{goal.title}</p>
                <p className="text-[11px] text-muted-foreground">{goal.detail}</p>
              </div>
              <span
                className={cn(
                  'text-[11px]',
                  goal.status === 'done' ? 'text-link' : 'text-muted-foreground',
                )}
              >
                {STUDENT_PROFILE_TEXT.goalStatus[goal.status]}
              </span>
            </li>
          )
        })}
      </ul>
      <AppLink
        to={ROUTES.projects}
        className={cn(
          ROUNDED_BUTTON_CLASS,
          'border-primary text-sm text-primary hover:bg-selected',
        )}
      >
        {STUDENT_PROFILE_TEXT.viewProjects} <span aria-hidden="true">→</span>
      </AppLink>
    </SectionCard>
  )
}
