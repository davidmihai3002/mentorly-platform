import { NAV_LINKS, SITE_TEXT } from '@/constants'

export function PublicNavLinks() {
  return (
    <nav aria-label={SITE_TEXT.mainNavLabel} className="hidden items-center gap-6 lg:flex">
      {NAV_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="rounded-sm text-sm font-medium whitespace-nowrap text-header-foreground transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
