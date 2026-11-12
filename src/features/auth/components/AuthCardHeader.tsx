type AuthCardHeaderProps = {
  title: string
  subtitle: string
}

export function AuthCardHeader({ title, subtitle }: AuthCardHeaderProps) {
  return (
    <header className="space-y-2 text-center">
      <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-[28px]">
        {title}
      </h1>
      <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
    </header>
  )
}
