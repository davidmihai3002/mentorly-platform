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
      className="h-[33px] w-full gap-2 rounded-lg border-input bg-background text-sm font-medium text-foreground hover:bg-muted"
      onClick={onClick}
    >
      <GoogleIcon />
      {label}
    </Button>
  )
}
