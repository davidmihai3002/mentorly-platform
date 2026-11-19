import { cn } from 'cn'
import { AppLink } from '@/components/navigation'
import { buttonVariants } from '@/components/ui'
import { ROUTES } from '@/constants'
import { SIGNUP_TEXT } from '../constants'

type SignupCardFooterProps = {
  onLoginClick: () => void
}

export function SignupCardFooter({ onLoginClick }: SignupCardFooterProps) {
  return (
    <p className="text-center text-xs text-foreground">
      {SIGNUP_TEXT.hasAccount}{' '}
      <AppLink
        to={ROUTES.login}
        className={cn(
          buttonVariants({ variant: 'link' }),
          'h-auto p-0 text-xs font-medium text-primary',
        )}
        onClick={onLoginClick}
      >
        {SIGNUP_TEXT.loginLink}
      </AppLink>
    </p>
  )
}
