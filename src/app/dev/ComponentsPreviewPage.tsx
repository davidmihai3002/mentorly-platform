import { cn } from 'cn'
import { useState } from 'react'
import {
  buttonVariants,
  ChoiceDialog,
  MentorCard,
  OptionCard,
  OptionGroup,
  SpecialtyCard,
} from '@/components'
import {
  COMPONENTS_PREVIEW_TEXT as TEXT,
  DOMAINS,
  FEATURED_MENTOR,
  LAYOUT_CONTAINER_CLASS,
  PILL_OUTLINE_CLASS,
  PILL_PRIMARY_CLASS,
  SAMPLE_MENTORS,
} from '@/constants'
import { ComponentsPreviewSection } from './ComponentsPreviewSection'

const OPTION_VALUES = ['first', 'second'] as const

type OptionValue = (typeof OPTION_VALUES)[number]

export function ComponentsPreviewPage() {
  const [selected, setSelected] = useState<OptionValue>('second')
  const [availability, setAvailability] = useState<string>()

  return (
    <div className={cn(LAYOUT_CONTAINER_CLASS, 'space-y-8 py-8')}>
      <title>{TEXT.pageTitle}</title>
      <header className="space-y-2">
        <h1 className="text-[28px] font-bold text-foreground">{TEXT.title}</h1>
        <p className="text-sm text-muted-foreground">{TEXT.subtitle}</p>
      </header>

      <ComponentsPreviewSection title={TEXT.dialogs} variant="dashed">
        <ChoiceDialog
          title={TEXT.dialogTitle}
          options={TEXT.dialogOptions}
          value={availability}
          onChange={setAvailability}
          trigger={
            <button type="button" className={cn(buttonVariants(), PILL_OUTLINE_CLASS)}>
              {TEXT.dialogOptions.find((option) => option.value === availability)?.label ??
                TEXT.dialogTrigger}
            </button>
          }
        />
      </ComponentsPreviewSection>

      <ComponentsPreviewSection title={TEXT.specialties} variant="panel">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAINS.map((domain) => (
            <SpecialtyCard key={domain.id} domain={domain} />
          ))}
        </div>
      </ComponentsPreviewSection>

      <ComponentsPreviewSection title={TEXT.cardVariants} variant="dashed">
        <div className="grid items-start gap-4 lg:grid-cols-[274px_1fr]">
          <MentorCard mentor={FEATURED_MENTOR} />
          <MentorCard mentor={FEATURED_MENTOR} variant="list" />
        </div>
      </ComponentsPreviewSection>

      <ComponentsPreviewSection title={TEXT.actions} variant="panel">
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" className={cn(buttonVariants(), PILL_PRIMARY_CLASS)}>
            {TEXT.applyAction}
          </button>
          <button type="button" className={cn(buttonVariants(), PILL_OUTLINE_CLASS)}>
            {TEXT.backAction}
          </button>
        </div>
        <OptionGroup legend={TEXT.optionLegend} isLegendHidden>
          {OPTION_VALUES.map((value) => (
            <OptionCard
              key={value}
              name="preview-option"
              value={value}
              title={TEXT.optionTitle}
              description={TEXT.optionDescription}
              checked={selected === value}
              onChange={() => setSelected(value)}
            />
          ))}
        </OptionGroup>
      </ComponentsPreviewSection>

      <ComponentsPreviewSection title={TEXT.cardExamples}>
        <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_MENTORS.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </ComponentsPreviewSection>
    </div>
  )
}
