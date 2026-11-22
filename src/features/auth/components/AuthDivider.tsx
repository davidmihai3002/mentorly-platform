import { cn } from 'cn'
import { AUTH_DENSITY_STYLES, LOGIN_TEXT } from '../constants'
import type { AuthDensity } from '../types'

type AuthDividerProps = {
  text?: string
  density?: AuthDensity
}

export function AuthDivider({ text = LOGIN_TEXT.divider, density = 'regular' }: AuthDividerProps) {
  return (
    <div className={cn('flex items-center gap-3', AUTH_DENSITY_STYLES[density].divider)}>
      <span className="h-px flex-1 bg-border" />
      <span>{text}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}
