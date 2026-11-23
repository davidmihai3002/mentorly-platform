import { cn } from 'cn'
import { AppLink } from '@/components'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, ROUTES } from '@/constants'
import { PROFILE_CARD_CLASS, PROFILE_TEXT } from '../constants'

export function ProfileNotFound() {
  return (
    <section
      className={cn(
        PROFILE_CARD_CLASS,
        'mx-auto flex max-w-md flex-col items-center gap-3 text-center',
      )}
    >
      <title>{PROFILE_TEXT.notFoundTitle}</title>
      <h1 className="text-2xl font-bold text-foreground">{PROFILE_TEXT.notFoundTitle}</h1>
      <p className="text-sm text-muted-foreground">{PROFILE_TEXT.notFoundText}</p>
      <AppLink to={ROUTES.mentors} className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}>
        {PROFILE_TEXT.backToSearch}
      </AppLink>
    </section>
  )
}
