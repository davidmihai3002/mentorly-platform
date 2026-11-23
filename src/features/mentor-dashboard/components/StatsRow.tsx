import { DASHBOARD_TEXT, STATS } from '../constants'

export function StatsRow() {
  return (
    <section
      id="privire-de-ansamblu"
      aria-label={DASHBOARD_TEXT.statsLabel}
      className="scroll-mt-24"
    >
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col gap-1 rounded-[16px] border border-border bg-card p-4"
          >
            <dt className="text-[11px] text-muted-foreground">{stat.label}</dt>
            <dd className="text-[26px] leading-[1.2] font-bold tracking-[-0.02em] text-foreground">
              {stat.value}
            </dd>
            <dd className="text-[11px] text-link">{stat.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
