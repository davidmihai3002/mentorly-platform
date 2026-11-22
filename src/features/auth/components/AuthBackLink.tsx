import { cn } from 'cn'
import { AppLink } from '@/components/navigation'
import { buttonVariants } from '@/components/ui'
import { ROUTES } from '@/constants'
import { AUTH_LINK_CLASS } from '../constants'

type AuthBackLinkProps = {
  label: string
}

export function AuthBackLink({ label }: AuthBackLinkProps) {
  return (
    <p className="text-center">
      <AppLink
        to={ROUTES.login}
        className={cn(buttonVariants({ variant: 'link' }), AUTH_LINK_CLASS)}
      >
        {label}
      </AppLink>
    </p>
  )
}
