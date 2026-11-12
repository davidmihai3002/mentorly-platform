import { Button } from '@/components/ui'
import { LOGIN_TEXT } from '../constants'
import { GoogleIcon } from './GoogleIcon'

type GoogleAuthButtonProps = {
  onClick: () => void
  label?: string
}

export function GoogleAuthButton({ onClick, label = LOGIN_TEXT.google }: GoogleAuthButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-10 w-full gap-2.5 rounded-lg border-border bg-card text-sm font-medium text-foreground shadow-2xs hover:bg-muted/50"
      onClick={onClick}
    >
      <GoogleIcon />
      {label}
    </Button>
  )
}
