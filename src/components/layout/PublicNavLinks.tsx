import { NAV_LINKS, SITE_TEXT } from '@/constants'

export function PublicNavLinks() {
  return (
    <nav aria-label={SITE_TEXT.mainNavLabel} className="hidden items-center gap-6 lg:flex xl:gap-8">
      {NAV_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="rounded-sm text-sm font-medium whitespace-nowrap text-header-foreground transition-colors hover:text-header-foreground/80 focus-visible:ring-3 focus-visible:ring-header-foreground/60 focus-visible:outline-none"
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
