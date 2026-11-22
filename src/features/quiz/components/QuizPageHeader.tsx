import { useEffect, useRef } from 'react'

type QuizPageHeaderProps = {
  title: string
  subtitle: string
  shouldFocus?: boolean
}

export function QuizPageHeader({ title, subtitle, shouldFocus = false }: QuizPageHeaderProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (shouldFocus) titleRef.current?.focus({ preventScroll: true })
  }, [shouldFocus, title])

  return (
    <header className="flex flex-col gap-1.5">
      <h1
        ref={titleRef}
        tabIndex={-1}
        className="text-[clamp(1.5rem,4vw,1.8125rem)] leading-[1.2] font-bold tracking-[-0.02em] text-foreground outline-none"
      >
        {title}
      </h1>
      <p className="text-sm leading-[1.45] tracking-[-0.02em] text-muted-foreground">{subtitle}</p>
    </header>
  )
}
