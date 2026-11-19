import { cn } from 'cn'
import { Link } from 'react-router'
import { buttonVariants } from '@/components/ui'
import { ROUTES, SITE_TEXT } from '@/constants'

export function GuestActions() {
  return (
    <div className="flex items-center gap-1 sm:gap-4">
      <Link
        to={ROUTES.login}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'hidden h-9 px-2 text-sm font-medium text-header-foreground sm:inline-flex sm:px-3 hover:bg-header-foreground/10 hover:text-header-foreground focus-visible:ring-header-foreground/60',
        )}
      >
        {SITE_TEXT.login}
      </Link>
      <Link
        to={ROUTES.signup}
        className={cn(
          buttonVariants(),
          'h-9 rounded-lg px-3 text-sm font-semibold sm:px-4 shadow-xs hover:bg-primary/90 focus-visible:ring-header-foreground/60',
        )}
      >
        {SITE_TEXT.register}
      </Link>
    </div>
  )
}
