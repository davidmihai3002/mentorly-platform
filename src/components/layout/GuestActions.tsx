import { cn } from 'cn'
import { AppLink } from '@/components/navigation'
import { buttonVariants } from '@/components/ui'
import { HEADER_GHOST_CLASS, HEADER_PRIMARY_CLASS, ROUTES, SITE_TEXT } from '@/constants'

export function GuestActions() {
  return (
    <div className="flex items-center gap-1 sm:gap-4">
      <AppLink
        to={ROUTES.login}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          HEADER_GHOST_CLASS,
          'hidden h-[33px] px-2 text-sm font-medium sm:inline-flex sm:px-3',
        )}
      >
        {SITE_TEXT.login}
      </AppLink>
      <AppLink
        to={ROUTES.signup}
        className={cn(buttonVariants(), HEADER_PRIMARY_CLASS, 'font-semibold')}
      >
        {SITE_TEXT.register}
      </AppLink>
    </div>
  )
}
