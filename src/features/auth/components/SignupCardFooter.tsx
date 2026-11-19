import { Button } from '@/components/ui'
import { SIGNUP_TEXT } from '../constants'

type SignupCardFooterProps = {
  onLoginClick: () => void
}

export function SignupCardFooter({ onLoginClick }: SignupCardFooterProps) {
  return (
    <p className="text-center text-xs text-foreground">
      {SIGNUP_TEXT.hasAccount}{' '}
      <Button
        type="button"
        variant="link"
        className="h-auto p-0 text-xs font-medium text-primary"
        onClick={onLoginClick}
      >
        {SIGNUP_TEXT.loginLink}
      </Button>
    </p>
  )
}
