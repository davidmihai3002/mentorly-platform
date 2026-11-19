import { cn } from 'cn'
import { MenuIcon, XIcon } from 'lucide-react'
import { useCallback, useId, useRef, useState } from 'react'
import { Link } from 'react-router'
import { buttonVariants } from '@/components/ui'
import { NAV_LINKS, ROUTES, SITE_TEXT } from '@/constants'
import { useOutsidePointerDown } from '@/hooks'

const MOBILE_LINK_CLASS =
  'block rounded-md px-3 py-2.5 text-sm font-medium text-header-foreground hover:bg-header-foreground/10 focus-visible:ring-3 focus-visible:ring-header-foreground/60 focus-visible:outline-none'

export function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const close = useCallback(() => setIsOpen(false), [])

  useOutsidePointerDown(containerRef, isOpen, close)

  return (
    <div
      ref={containerRef}
      className="lg:hidden"
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !isOpen) return
        close()
        toggleRef.current?.focus()
      }}
    >
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? SITE_TEXT.closeMenu : SITE_TEXT.openMenu}
        onClick={() => setIsOpen((current) => !current)}
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon-lg' }),
          'text-header-foreground hover:bg-header-foreground/10 hover:text-header-foreground focus-visible:ring-header-foreground/60 aria-expanded:bg-header-foreground/10 aria-expanded:text-header-foreground',
        )}
      >
        {isOpen ? <XIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
      </button>

      <nav
        id={panelId}
        aria-label={SITE_TEXT.mobileNavLabel}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full border-t border-header-foreground/15 bg-header px-4 py-3 shadow-md sm:px-8"
      >
        <ul className="mx-auto max-w-6xl space-y-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={MOBILE_LINK_CLASS} onClick={close}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="sm:hidden">
            <Link to={ROUTES.login} className={MOBILE_LINK_CLASS} onClick={close}>
              {SITE_TEXT.login}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
