import { cn } from 'cn'

type SectionHeadingProps = {
  titleId: string
  eyebrow: string
  eyebrowStyle: 'text' | 'pill'
  title: string
  subtitle: string
  titleClassName?: string
  subtitleClassName?: string
}

export function SectionHeading({
  titleId,
  eyebrow,
  eyebrowStyle,
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
}: SectionHeadingProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <p
        className={cn(
          'uppercase',
          eyebrowStyle === 'text'
            ? 'text-sm leading-[1.25] font-bold tracking-[0.08em] text-link'
            : 'inline-flex h-[27px] items-center rounded-full bg-selected px-3.5 text-[11px] font-semibold text-foreground',
        )}
      >
        {eyebrow}
      </p>
      <h1
        id={titleId}
        className={cn('mt-2 font-bold text-balance text-foreground', titleClassName)}
      >
        {title}
      </h1>
      <p className={cn('mt-2 max-w-[544px] text-base', subtitleClassName)}>{subtitle}</p>
    </header>
  )
}
