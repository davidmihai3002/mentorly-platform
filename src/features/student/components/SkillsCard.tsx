import { STUDENT_PROFILE_TEXT } from '../constants'
import { SectionCard } from './SectionCard'

export function SkillsCard() {
  return (
    <SectionCard title={STUDENT_PROFILE_TEXT.skillsTitle}>
      <p className="text-xs leading-[1.6] text-muted-foreground">
        {STUDENT_PROFILE_TEXT.skillsMeta.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
      <ul className="flex flex-wrap gap-2">
        {STUDENT_PROFILE_TEXT.skills.map((skill) => (
          <li key={skill} className="rounded-[12px] bg-tag px-2.5 py-1 text-[10px] text-foreground">
            {skill}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-1.5 border-t border-border pt-3">
        <h3 className="text-[13px] font-semibold text-foreground">
          {STUDENT_PROFILE_TEXT.deepenTitle}
        </h3>
        <p className="text-[13px] text-foreground">{STUDENT_PROFILE_TEXT.deepen}</p>
      </div>
    </SectionCard>
  )
}
