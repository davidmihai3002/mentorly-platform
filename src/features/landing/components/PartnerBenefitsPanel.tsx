import { CircleCheck } from 'lucide-react'
import { PARTNER_BENEFITS, PARTNERS_TEXT } from '../constants'

export function PartnerBenefitsPanel() {
  return (
    <section
      aria-labelledby="partner-benefits-title"
      className="flex flex-col gap-[18px] rounded-[16px] border border-border bg-card/60 p-6"
    >
      <h2
        id="partner-benefits-title"
        className="max-w-[446px] text-[30px] leading-[1.15] font-bold text-foreground"
      >
        {PARTNERS_TEXT.benefitsTitle}
      </h2>
      <p className="text-base leading-[1.45] text-foreground">{PARTNERS_TEXT.benefitsText}</p>
      <ul className="flex flex-col gap-3">
        {PARTNER_BENEFITS.map((benefit) => (
          <li
            key={benefit}
            className="flex items-center gap-2.5 rounded-[12px] bg-selected p-3 text-sm text-foreground"
          >
            <CircleCheck
              aria-hidden="true"
              className="size-5 shrink-0 text-link"
              strokeWidth={1.5}
            />
            {benefit}
          </li>
        ))}
      </ul>
    </section>
  )
}
