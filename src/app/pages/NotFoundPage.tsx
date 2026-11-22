import { cn } from 'cn'
import { AppLink, buttonVariants } from '@/components'
import { NOT_FOUND_TEXT, ROUTES } from '@/constants'
import { AUTH_DENSITY_STYLES, AUTH_SUBMIT_BASE_CLASS, AuthCard } from '@/features/auth'

export function NotFoundPage() {
  return (
    <AuthCard density="compact">
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
        <AppLink
          to={ROUTES.home}
          className={cn(
            buttonVariants(),
            AUTH_SUBMIT_BASE_CLASS,
            AUTH_DENSITY_STYLES.compact.submit,
          )}
        >
          {NOT_FOUND_TEXT.backHome}
        </AppLink>
      </div>
    </AuthCard>
  )
}
