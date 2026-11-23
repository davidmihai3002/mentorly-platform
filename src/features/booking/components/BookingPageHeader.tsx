type BookingPageHeaderProps = {
  title: string
  subtitle: string
}

export function BookingPageHeader({ title, subtitle }: BookingPageHeaderProps) {
  return (
    <header className="flex flex-col gap-1.5">
      <h1 className="text-[clamp(1.5rem,4vw,1.8125rem)] leading-[1.2] font-bold tracking-[-0.02em] text-foreground">
        {title}
      </h1>
      <p className="text-sm tracking-[-0.02em] text-muted-foreground">{subtitle}</p>
    </header>
  )
}
