import { cn } from 'cn'
import { Button } from '@/components/ui'
import { AUTH_DENSITY_STYLES, LOGIN_TEXT } from '../constants'
import type { AuthDensity } from '../types'
import { GoogleIcon } from './GoogleIcon'

type GoogleAuthButtonProps = {
  onClick: () => void
  label?: string
  density?: AuthDensity
  hasIcon?: boolean
}

export function GoogleAuthButton({
  onClick,
  label = LOGIN_TEXT.google,
  density = 'regular',
  hasIcon = true,
}: GoogleAuthButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        'w-full gap-2 rounded-lg border-input bg-background text-sm font-medium text-foreground hover:bg-muted',
        AUTH_DENSITY_STYLES[density].google,
      )}
      onClick={onClick}
    >
      {hasIcon && <GoogleIcon />}
      {label}
    </Button>
  )
}
