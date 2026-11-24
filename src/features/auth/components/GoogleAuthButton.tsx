import { cn } from 'cn'
import type { ComponentProps } from 'react'
import { Button } from '@/components/ui'
import { AUTH_DENSITY_STYLES, LOGIN_TEXT } from '../constants'
import type { AuthDensity } from '../types'
import { GoogleIcon } from './GoogleIcon'

type GoogleAuthButtonProps = ComponentProps<typeof Button> & {
  label?: string
  density?: AuthDensity
  hasIcon?: boolean
}

export function GoogleAuthButton({
  label = LOGIN_TEXT.google,
  density = 'regular',
  hasIcon = true,
  ...props
}: GoogleAuthButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      {...props}
      className={cn(
        'w-full gap-2 rounded-lg border-input bg-background text-sm font-medium text-foreground hover:bg-muted',
        AUTH_DENSITY_STYLES[density].google,
      )}
    >
      {hasIcon && <GoogleIcon />}
      {label}
    </Button>
  )
}
