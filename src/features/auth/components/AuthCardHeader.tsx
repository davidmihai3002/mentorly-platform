type AuthCardHeaderProps = {
  title: string
  subtitle?: string
}

export function AuthCardHeader({ title, subtitle }: AuthCardHeaderProps) {
  return (
    <header className="space-y-2 text-center">
      <h1 className="font-heading text-[28px] leading-[1.25] font-bold text-foreground">{title}</h1>
      {subtitle && (
        <p className="mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </header>
  )
}
