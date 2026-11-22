import { cn } from 'cn'
import type { ReactNode } from 'react'
import { AUTH_DENSITY_STYLES } from '../constants'
import type { AuthDensity } from '../types'

type AuthCardProps = {
  density: AuthDensity
  children: ReactNode
}

export function AuthCard({ density, children }: AuthCardProps) {
  return (
    <div
      className={cn(
        'w-full space-y-5 rounded-2xl border border-border bg-card [view-transition-name:auth-card]',
        AUTH_DENSITY_STYLES[density].card,
      )}
    >
      {children}
    </div>
  )
}
