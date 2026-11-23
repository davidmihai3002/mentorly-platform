import { AppLink } from '@/components'
import { ROUTES } from '@/constants'
import { PROFILE_TEXT } from '../constants'

type ProfileBreadcrumbProps = {
  category: string
  name: string
}

export function ProfileBreadcrumb({ category, name }: ProfileBreadcrumbProps) {
  return (
    <div className="flex items-center justify-between gap-3 text-[13px]">
      <nav aria-label={PROFILE_TEXT.breadcrumbLabel}>
        <ol className="flex flex-wrap items-center gap-1.5 text-link">
          <li>
            <AppLink
              to={ROUTES.mentors}
              className="rounded-sm hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
            >
              {PROFILE_TEXT.mentors}
            </AppLink>
          </li>
          {category && (
            <li className="flex items-center gap-1.5">
              <span aria-hidden="true">/</span>
              {category}
            </li>
          )}
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            <span aria-current="page">{name}</span>
          </li>
        </ol>
      </nav>
      <span className="text-muted-foreground">{PROFILE_TEXT.publicProfile}</span>
    </div>
  )
}
