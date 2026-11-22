import { cn } from 'cn'
import { useNavigate } from 'react-router'
import { AppLink } from '@/components/navigation'
import { buttonVariants } from '@/components/ui'
import {
  HEADER_GHOST_CLASS,
  HEADER_PRIMARY_CLASS,
  LOGOUT_STATE,
  ROUTES,
  SITE_TEXT,
} from '@/constants'

type AccountActionsProps = {
  homePath: string
}

export function AccountActions({ homePath }: AccountActionsProps) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center gap-1 sm:gap-4">
      <AppLink
        to={homePath}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          HEADER_GHOST_CLASS,
          'hidden h-[33px] px-2 text-sm font-normal sm:inline-flex sm:px-3',
        )}
      >
        {SITE_TEXT.accountMenu}
      </AppLink>
      <button
        type="button"
        onClick={() => void navigate(ROUTES.login, { viewTransition: true, state: LOGOUT_STATE })}
        className={cn(buttonVariants(), HEADER_PRIMARY_CLASS, 'font-normal')}
      >
        {SITE_TEXT.logout}
      </button>
    </div>
  )
}
