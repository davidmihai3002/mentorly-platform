import { ExternalLinkItem, SectionCard } from '@/components'
import { STUDENT_LINKS, STUDENT_PROFILE_TEXT } from '../constants'

export function LinksCard() {
  return (
    <SectionCard title={STUDENT_PROFILE_TEXT.linksTitle}>
      <ul className="flex flex-col gap-0.5">
        {STUDENT_LINKS.map((link) => (
          <li key={link.label}>
            <ExternalLinkItem link={link} className="text-xs" />
          </li>
        ))}
      </ul>
      <p className="text-[10px] text-muted-foreground">{STUDENT_PROFILE_TEXT.linksNote}</p>
    </SectionCard>
  )
}
