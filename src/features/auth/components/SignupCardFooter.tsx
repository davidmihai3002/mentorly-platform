import { cn } from 'cn'
import { AppLink } from '@/components/navigation'
import { buttonVariants } from '@/components/ui'
import { ROUTES } from '@/constants'
import { AUTH_LINK_CLASS, SIGNUP_TEXT } from '../constants'

type SignupCardFooterProps = {
  onLoginClick: () => void
}

export function SignupCardFooter({ onLoginClick }: SignupCardFooterProps) {
  return (
    <p className="text-center text-[13px] text-foreground">
      {SIGNUP_TEXT.hasAccount}{' '}
      <AppLink
        to={ROUTES.login}
        className={cn(buttonVariants({ variant: 'link' }), AUTH_LINK_CLASS)}
        onClick={onLoginClick}
      >
        {SIGNUP_TEXT.loginLink}
      </AppLink>
    </p>
  )
}
