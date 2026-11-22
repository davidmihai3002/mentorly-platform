import { cn } from 'cn'
import { Pill } from './Pill'

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
      {eyebrowStyle === 'text' ? (
        <p className="text-sm leading-[1.25] font-bold tracking-[0.08em] text-link uppercase">
          {eyebrow}
        </p>
      ) : (
        <Pill size="md" className="px-3.5 font-semibold">
          {eyebrow}
        </Pill>
      )}
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
