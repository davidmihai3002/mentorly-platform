import { cn } from 'cn'
import { useId } from 'react'
import { Lock, UserRound } from 'lucide-react'
import { STUDENT_PROFILE_TEXT } from '../constants'
import type { StudentDetails } from '../types'

type StudentHeroProps = {
  details: StudentDetails
}

export function StudentHero({ details }: StudentHeroProps) {
  const nameId = useId()

  return (
    <section
      aria-labelledby={nameId}
      className="flex flex-col gap-4 rounded-[16px] border border-border bg-card p-5 shadow-card-soft sm:p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <span className="grid size-[76px] shrink-0 place-items-center rounded-full border-4 border-card bg-muted text-foreground/70 shadow-avatar">
          <UserRound aria-hidden="true" className="size-10 fill-current" />
        </span>
        <div className="flex min-w-0 flex-col gap-1.5">
          <ul className="flex flex-wrap gap-2">
            {STUDENT_PROFILE_TEXT.badges.map((badge, index) => (
              <li
                key={badge}
                className={cn(
                  'rounded-[12px] bg-tag px-2.5 py-1 text-[10px]',
                  index === 0 && 'uppercase',
                )}
              >
                {badge}
              </li>
            ))}
          </ul>
          <h2
            id={nameId}
            className="text-[clamp(1.5rem,4vw,1.75rem)] leading-[1.2] font-bold tracking-[-0.02em] text-foreground"
          >
            {details.fullName}
          </h2>
          <p className="text-sm text-foreground">
            {STUDENT_PROFILE_TEXT.careerGoalPrefix} {details.careerGoal}
          </p>
          <p className="text-xs text-muted-foreground">
            {details.city} · {STUDENT_PROFILE_TEXT.memberSince}
          </p>
        </div>
      </div>
      <p className="flex items-center gap-2 border-t border-border pt-3 text-[11px] text-foreground">
        <Lock aria-hidden="true" className="size-3.5 shrink-0" />
        {STUDENT_PROFILE_TEXT.privacy}
      </p>
    </section>
  )
}
