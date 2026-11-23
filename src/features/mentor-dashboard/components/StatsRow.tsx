import { DASHBOARD_TEXT, SECTION_IDS, STATS } from '../constants'

export function StatsRow() {
  return (
    <section
      id={SECTION_IDS.overview}
      aria-label={DASHBOARD_TEXT.statsLabel}
      className="scroll-mt-24"
    >
      <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 rounded-[16px] border border-border bg-card p-4"
          >
            <dt className="text-[11px] text-muted-foreground">{stat.label}</dt>
            <dd className="text-[26px] leading-[1.2] font-bold tracking-[-0.02em] text-foreground">
              {stat.value}
            </dd>
            <dd className="text-[11px] text-muted-foreground">{stat.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
