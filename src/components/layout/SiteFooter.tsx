import { cn } from 'cn'
import { FOOTER_LINKS, LAYOUT_CONTAINER_CLASS, SITE_TEXT } from '@/constants'

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-auto border-t border-border bg-card/40 [view-transition-name:site-footer]">
      <div
        className={cn(
          LAYOUT_CONTAINER_CLASS,
          'flex min-h-16 flex-col items-center justify-between gap-2 py-4 text-xs sm:flex-row',
        )}
      >
        <p className="text-muted-foreground">{SITE_TEXT.copyright}</p>

        <nav aria-label={SITE_TEXT.footerNavLabel} className="flex items-center gap-5">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-sm text-link transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
