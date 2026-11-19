import type { ReactNode } from 'react'
import { MentorlyLogo } from './MentorlyLogo'

type SiteHeaderProps = {
  children: ReactNode
}

export function SiteHeader({ children }: SiteHeaderProps) {
  return (
    <header className="relative z-20 bg-header text-header-foreground shadow-sm">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-8">
        <MentorlyLogo />
        {children}
      </div>
    </header>
  )
}
