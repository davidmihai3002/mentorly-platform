import { Button } from '@/components/ui'
import { LOGIN_TEXT } from '../constants'

type AuthCardFooterProps = {
  onRegisterClick: () => void
}

export function AuthCardFooter({ onRegisterClick }: AuthCardFooterProps) {
  return (
    <p className="text-center text-xs text-foreground">
      {LOGIN_TEXT.noAccount}{' '}
      <Button
        type="button"
        variant="link"
        className="h-auto p-0 text-xs font-medium text-primary"
        onClick={onRegisterClick}
      >
        {LOGIN_TEXT.registerMentee}
      </Button>{' '}
      <span className="text-muted-foreground">{LOGIN_TEXT.minimumAge}</span>
    </p>
  )
}
