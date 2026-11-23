import { DASHBOARD_TEXT } from '../constants'

type DashboardHeaderProps = {
  firstName: string
}

export function DashboardHeader({ firstName }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[clamp(1.5rem,4vw,1.8125rem)] leading-[1.2] font-bold tracking-[-0.02em] text-foreground">
          {DASHBOARD_TEXT.greeting(firstName)}
        </h1>
        <p className="text-sm text-muted-foreground">{DASHBOARD_TEXT.subtitle}</p>
      </div>
      <nav aria-label={DASHBOARD_TEXT.sectionsLabel}>
        <ul className="flex flex-wrap gap-2">
          {DASHBOARD_TEXT.sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="inline-flex min-h-[26px] items-center rounded-[13px] bg-tag px-2.5 text-[11px] text-foreground transition-colors hover:bg-selected focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
