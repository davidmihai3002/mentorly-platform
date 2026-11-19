import { cn } from 'cn'
import { Link } from 'react-router'
import { buttonVariants } from '@/components/ui'
import { ROUTES } from '@/constants'
import { LOGIN_TEXT } from '../constants'

type AuthCardFooterProps = {
  onRegisterClick: () => void
}

export function AuthCardFooter({ onRegisterClick }: AuthCardFooterProps) {
  return (
    <p className="text-center text-xs text-foreground">
      {LOGIN_TEXT.noAccount}{' '}
      <Link
        to={ROUTES.signup}
        className={cn(
          buttonVariants({ variant: 'link' }),
          'h-auto p-0 text-xs font-medium text-primary',
        )}
        onClick={onRegisterClick}
      >
        {LOGIN_TEXT.registerMentee}
      </Link>{' '}
      <span className="text-muted-foreground">{LOGIN_TEXT.minimumAge}</span>
    </p>
  )
}
