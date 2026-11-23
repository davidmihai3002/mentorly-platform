import { cn } from 'cn'
import { AppLink } from '@/components'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, ROUTES } from '@/constants'
import { UNAVAILABLE_TEXT } from '../constants'

export function ReviewsUnavailable() {
  return (
    <section className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-[16px] border border-border bg-card p-6 text-center">
      <title>{UNAVAILABLE_TEXT.title}</title>
      <h1 className="text-2xl font-bold text-foreground">{UNAVAILABLE_TEXT.title}</h1>
      <p className="text-sm text-muted-foreground">{UNAVAILABLE_TEXT.text}</p>
      <AppLink to={ROUTES.mentors} className={cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS)}>
        {UNAVAILABLE_TEXT.back}
      </AppLink>
    </section>
  )
}
