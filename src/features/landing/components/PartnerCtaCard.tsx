import { cn } from 'cn'
import { HERO_PILL_CLASS, PARTNERS_TEXT } from '../constants'

export function PartnerCtaCard() {
  return (
    <section
      aria-labelledby="partner-cta-title"
      className="flex flex-col items-start rounded-[16px] border border-border bg-card/80 p-6 shadow-card-wide"
    >
      <p className="inline-flex h-[22px] items-center rounded-full border border-pill-border bg-selected px-2.5 text-[9px] font-semibold text-foreground uppercase">
        {PARTNERS_TEXT.ctaEyebrow}
      </p>
      <h2 id="partner-cta-title" className="mt-4 text-xl leading-[1.2] font-bold text-foreground">
        {PARTNERS_TEXT.ctaTitle}
      </h2>
      <p className="mt-2 text-sm leading-[1.45] text-foreground">{PARTNERS_TEXT.ctaText}</p>
      <a
        href={`mailto:${PARTNERS_TEXT.email}`}
        className={cn(
          HERO_PILL_CLASS,
          'mt-5 w-full border-primary-border bg-primary font-semibold text-primary-foreground shadow-primary hover:bg-primary/90',
        )}
      >
        {PARTNERS_TEXT.ctaButton}
      </a>
      <a
        href={`mailto:${PARTNERS_TEXT.email}`}
        className="mt-4 rounded-sm text-xs font-medium text-link transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
      >
        {PARTNERS_TEXT.email}
      </a>
    </section>
  )
}
