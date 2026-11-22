import { cn } from 'cn'
import { useState } from 'react'
import { buttonVariants, MentorCard, OptionCard, SpecialtyCard } from '@/components'
import {
  COMPONENTS_PREVIEW_TEXT as TEXT,
  DOMAINS,
  LAYOUT_CONTAINER_CLASS,
  PILL_OUTLINE_CLASS,
  PILL_PRIMARY_CLASS,
  SAMPLE_MENTORS,
} from '@/constants'
import { ComponentsPreviewSection } from './ComponentsPreviewSection'

const OPTION_VALUES = ['first', 'second'] as const

export function ComponentsPreviewPage() {
  const [selected, setSelected] = useState<string>(OPTION_VALUES[1])
  const [featured] = SAMPLE_MENTORS

  return (
    <div className={cn(LAYOUT_CONTAINER_CLASS, 'space-y-8 py-8')}>
      <title>{TEXT.pageTitle}</title>
      <header className="space-y-2">
        <h1 className="text-[28px] font-bold text-foreground">{TEXT.title}</h1>
        <p className="text-sm text-muted-foreground">{TEXT.subtitle}</p>
      </header>

      <ComponentsPreviewSection title={TEXT.specialties}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((domain) => (
            <SpecialtyCard key={domain.id} domain={domain} />
          ))}
        </div>
      </ComponentsPreviewSection>

      {featured && (
        <ComponentsPreviewSection title={TEXT.cardVariants}>
          <div className="grid gap-4 lg:grid-cols-[274px_1fr]">
            <MentorCard mentor={featured} />
            <MentorCard mentor={featured} variant="list" />
          </div>
        </ComponentsPreviewSection>
      )}

      <ComponentsPreviewSection title={TEXT.actions}>
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" className={cn(buttonVariants(), PILL_PRIMARY_CLASS)}>
            {TEXT.applyAction}
          </button>
          <button type="button" className={cn(buttonVariants(), PILL_OUTLINE_CLASS)}>
            {TEXT.backAction}
          </button>
        </div>
        <div className="space-y-3">
          {OPTION_VALUES.map((value) => (
            <OptionCard
              key={value}
              name="preview-option"
              value={value}
              title={TEXT.optionTitle}
              description={TEXT.optionDescription}
              checked={selected === value}
              onChange={(event) => setSelected(event.target.value)}
            />
          ))}
        </div>
      </ComponentsPreviewSection>

      <ComponentsPreviewSection title={TEXT.cardExamples}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_MENTORS.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </ComponentsPreviewSection>
    </div>
  )
}
