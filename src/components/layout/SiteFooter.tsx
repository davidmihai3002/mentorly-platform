import { FOOTER_LINKS, SITE_TEXT } from '@/constants'

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-auto">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-8">
        <p>{SITE_TEXT.copyright}</p>

        <nav aria-label={SITE_TEXT.footerNavLabel} className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-sm transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
