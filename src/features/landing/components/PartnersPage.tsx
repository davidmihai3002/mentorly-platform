import { cn } from 'cn'
import { LAYOUT_CONTAINER_CLASS } from '@/constants'
import { LANDING_SECTION_CLASS, PARTNERS, PARTNERS_TEXT } from '../constants'
import { PartnerBenefitsPanel } from './PartnerBenefitsPanel'
import { PartnerCard } from './PartnerCard'
import { PartnerCtaCard } from './PartnerCtaCard'
import { SectionHeading } from './SectionHeading'

export function PartnersPage() {
  return (
    <section
      aria-labelledby="partners-title"
      className={cn(LAYOUT_CONTAINER_CLASS, LANDING_SECTION_CLASS)}
    >
      <title>{PARTNERS_TEXT.pageTitle}</title>
      <SectionHeading
        titleId="partners-title"
        eyebrow={PARTNERS_TEXT.eyebrow}
        eyebrowStyle="pill"
        title={PARTNERS_TEXT.title}
        subtitle={PARTNERS_TEXT.subtitle}
        titleClassName="mt-[13px] text-[clamp(2rem,5vw,2.625rem)] leading-[1.15]"
        subtitleClassName="mt-3 max-w-[704px] text-[17px] leading-[1.5] text-foreground"
      />
      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {PARTNERS.map((partner) => (
          <li key={partner.id} className="flex">
            <PartnerCard partner={partner} />
          </li>
        ))}
      </ul>
      <div className="mt-[34px] grid items-start gap-[34px] md:grid-cols-[minmax(0,494px)_minmax(0,1fr)]">
        <PartnerBenefitsPanel />
        <PartnerCtaCard />
      </div>
    </section>
  )
}
