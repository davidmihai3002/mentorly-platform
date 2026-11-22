import { cn } from 'cn'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import { PARTNERS_TEXT } from '../constants'
import { Pill } from './Pill'

export function PartnerCtaCard() {
  return (
    <section
      aria-labelledby="partner-cta-title"
      className="flex flex-col items-start rounded-[16px] border border-border bg-card/80 p-6 shadow-card-wide"
    >
      <Pill size="sm" hasBorder className="text-[9px] font-semibold">
        {PARTNERS_TEXT.ctaEyebrow}
      </Pill>
      <h2 id="partner-cta-title" className="mt-4 text-xl leading-[1.2] font-bold text-foreground">
        {PARTNERS_TEXT.ctaTitle}
      </h2>
      <p className="mt-2 text-sm leading-[1.45] text-foreground">{PARTNERS_TEXT.ctaText}</p>
      <a
        href={`mailto:${PARTNERS_TEXT.email}`}
        className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, 'mt-5 w-full font-semibold')}
      >
        {PARTNERS_TEXT.ctaButton}
      </a>
      <p className="mt-4 text-xs font-medium text-link">{PARTNERS_TEXT.email}</p>
    </section>
  )
}
