import { cn } from 'cn'
import type { ReactNode } from 'react'
import { LAYOUT_CONTAINER_CLASS } from '@/constants'
import { MentorlyLogo } from './MentorlyLogo'

type SiteHeaderProps = {
  children: ReactNode
}

export function SiteHeader({ children }: SiteHeaderProps) {
  return (
    <header className="relative z-20 border-b border-border bg-header text-header-foreground [view-transition-name:site-header]">
      <div
        className={cn(
          LAYOUT_CONTAINER_CLASS,
          'flex h-[77px] items-center justify-between gap-2 sm:gap-4',
        )}
      >
        <MentorlyLogo />
        {children}
      </div>
    </header>
  )
}
