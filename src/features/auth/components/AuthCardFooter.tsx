import { cn } from 'cn'
import { AppLink } from '@/components/navigation'
import { buttonVariants } from '@/components/ui'
import { ROUTES } from '@/constants'
import { AUTH_LINK_CLASS, LOGIN_TEXT } from '../constants'

type AuthCardFooterProps = {
  onRegisterClick: () => void
}

export function AuthCardFooter({ onRegisterClick }: AuthCardFooterProps) {
  return (
    <p className="text-[13px] leading-[1.6] text-foreground">
      {LOGIN_TEXT.noAccount}{' '}
      <AppLink
        to={ROUTES.signup}
        className={cn(buttonVariants({ variant: 'link' }), AUTH_LINK_CLASS)}
        onClick={onRegisterClick}
      >
        {LOGIN_TEXT.registerMentee}
      </AppLink>
      <span className="block">{LOGIN_TEXT.minimumAge}</span>
    </p>
  )
}
