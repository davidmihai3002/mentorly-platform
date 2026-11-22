import { cn } from 'cn'
import { LAYOUT_CONTAINER_CLASS } from '@/constants'
import { ABOUT_TEXT, BENEFITS, LANDING_SECTION_CLASS } from '../constants'
import { BenefitCard } from './BenefitCard'
import { CardGrid } from './CardGrid'
import { SectionHeading } from './SectionHeading'

export function AboutPage() {
  return (
    <section
      aria-labelledby="about-title"
      className={cn(LAYOUT_CONTAINER_CLASS, LANDING_SECTION_CLASS)}
    >
      <title>{ABOUT_TEXT.pageTitle}</title>
      <SectionHeading
        titleId="about-title"
        eyebrow={ABOUT_TEXT.eyebrow}
        eyebrowStyle="text"
        title={ABOUT_TEXT.title}
        subtitle={ABOUT_TEXT.subtitle}
        titleClassName="text-[clamp(2rem,5vw,2.5625rem)] leading-[1.15]"
        subtitleClassName="font-medium leading-[1.4] text-link-muted"
      />
      <CardGrid
        items={BENEFITS}
        getKey={(benefit) => benefit.id}
        renderItem={(benefit, index) => <BenefitCard benefit={benefit} position={index + 1} />}
        className="mt-[34px]"
      />
    </section>
  )
}
