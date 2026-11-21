import { cn } from 'cn'
import { AppLink } from '@/components/navigation'
import { buttonVariants } from '@/components/ui'
import { HEADER_GHOST_CLASS, ROUTES, SITE_TEXT } from '@/constants'

export function GuestActions() {
  return (
    <div className="flex items-center gap-1 sm:gap-4">
      <AppLink
        to={ROUTES.login}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          HEADER_GHOST_CLASS,
          'hidden h-9 px-2 text-sm font-medium sm:inline-flex sm:px-3',
        )}
      >
        {SITE_TEXT.login}
      </AppLink>
      <AppLink
        to={ROUTES.signup}
        className={cn(
          buttonVariants(),
          'h-9 rounded-lg px-3 text-sm font-semibold sm:px-4 shadow-xs hover:bg-primary/90 focus-visible:ring-header-foreground/60',
        )}
      >
        {SITE_TEXT.register}
      </AppLink>
    </div>
  )
}
