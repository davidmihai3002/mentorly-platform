import { formatLei } from '@/utils'
import { SectionCard } from '@/components'
import { cn } from 'cn'
import { useId, useState } from 'react'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS } from '@/constants'
import { DASHBOARD_TEXT, EARNINGS, SECTION_IDS } from '../constants'
import { barHeight } from '../utils'

const MAX_AMOUNT = Math.max(...EARNINGS.map((month) => month.amount))

export function EarningsCard() {
  const historyId = useId()
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  return (
    <SectionCard id={SECTION_IDS.earnings} title={DASHBOARD_TEXT.earningsTitle}>
      <p className="text-[11px] text-muted-foreground">{DASHBOARD_TEXT.earningsNote}</p>
      <ul
        aria-label={DASHBOARD_TEXT.earningsLabel}
        className="grid h-40 grid-cols-4 items-end gap-4"
      >
        {EARNINGS.map((month) => (
          <li key={month.month} className="flex h-full flex-col justify-end gap-1.5">
            <span className="text-[11px] font-semibold text-foreground">
              <span className="sr-only">{month.fullMonth}: </span>
              {formatLei(month.amount)}
            </span>
            <span
              aria-hidden="true"
              className="block rounded-[4px] bg-primary"
              style={{ height: `${barHeight(month.amount, MAX_AMOUNT)}%` }}
            />
            <span aria-hidden="true" className="text-[11px] text-muted-foreground">
              {month.month}
            </span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        aria-expanded={isHistoryOpen}
        aria-controls={historyId}
        onClick={() => setIsHistoryOpen((current) => !current)}
        className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}
      >
        {isHistoryOpen ? DASHBOARD_TEXT.hideHistory : DASHBOARD_TEXT.showHistory}
      </button>
      <table id={historyId} hidden={!isHistoryOpen} className="w-full text-[13px]">
        <caption className="sr-only">{DASHBOARD_TEXT.historyCaption}</caption>
        <thead>
          <tr className="text-left text-[11px] text-muted-foreground">
            <th scope="col" className="pb-1 font-medium">
              {DASHBOARD_TEXT.monthColumn}
            </th>
            <th scope="col" className="pb-1 text-right font-medium">
              {DASHBOARD_TEXT.amountColumn}
            </th>
          </tr>
        </thead>
        <tbody>
          {EARNINGS.toReversed().map((month) => (
            <tr key={month.month} className="border-t border-border">
              <th scope="row" className="py-1.5 text-left font-normal text-foreground">
                {month.fullMonth}
              </th>
              <td className="py-1.5 text-right font-semibold text-foreground">
                {formatLei(month.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  )
}
