import { cn } from 'cn'
import { Link } from 'react-router'
import { buttonVariants } from '@/components'
import { NOT_FOUND_TEXT, ROUTES } from '@/constants'

export function NotFoundPage() {
  return (
    <div className="space-y-5 text-center">
      <title>{NOT_FOUND_TEXT.pageTitle}</title>
      <p className="font-heading text-5xl font-extrabold tracking-tight text-primary">
        {NOT_FOUND_TEXT.code}
      </p>
      <div className="space-y-2">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
          {NOT_FOUND_TEXT.title}
        </h1>
        <p className="text-sm text-muted-foreground">{NOT_FOUND_TEXT.subtitle}</p>
      </div>
      <Link
        to={ROUTES.home}
        className={cn(
          buttonVariants(),
          'h-10 w-full rounded-lg bg-brand-navy text-sm font-semibold text-brand-navy-foreground shadow-xs hover:bg-brand-navy/90',
        )}
      >
        {NOT_FOUND_TEXT.backHome}
      </Link>
    </div>
  )
}
