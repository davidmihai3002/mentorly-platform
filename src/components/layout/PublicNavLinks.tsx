import { AppNavLink } from '@/components/navigation'
import { NAV_LINKS, SITE_TEXT } from '@/constants'

export function PublicNavLinks() {
  return (
    <nav aria-label={SITE_TEXT.mainNavLabel} className="hidden items-center gap-6 lg:flex">
      {NAV_LINKS.map((link) => (
        <AppNavLink
          key={link.to}
          to={link.to}
          className="relative rounded-sm text-sm font-medium whitespace-nowrap text-header-foreground transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-header-foreground after:transition-transform after:duration-(--motion-duration) hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none aria-[current=page]:after:scale-x-100"
        >
          {link.label}
        </AppNavLink>
      ))}
    </nav>
  )
}
