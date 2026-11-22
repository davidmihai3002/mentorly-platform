import { cn } from 'cn'
import { MenuIcon, XIcon } from 'lucide-react'
import { useCallback, useId, useRef, useState } from 'react'
import { AppLink, AppNavLink } from '@/components/navigation'
import { buttonVariants } from '@/components/ui'
import { HEADER_GHOST_CLASS, NAV_LINKS, SITE_TEXT } from '@/constants'
import { useEscapeKey, useOutsidePointerDown } from '@/hooks'

const MOBILE_LINK_CLASS =
  'block rounded-md px-3 py-2.5 text-sm font-medium text-header-foreground hover:bg-header-foreground/5 hover:text-primary aria-[current=page]:bg-selected aria-[current=page]:text-link focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none'

type MobileNavMenuProps = {
  secondaryLink: { label: string; to: string }
}

export function MobileNavMenu({ secondaryLink }: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const panelId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const close = useCallback(() => setIsOpen(false), [])

  const closeAndRefocus = useCallback(() => {
    close()
    toggleRef.current?.focus()
  }, [close])

  useOutsidePointerDown(containerRef, isOpen, close)
  useEscapeKey(isOpen, closeAndRefocus)

  return (
    <div ref={containerRef} className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? SITE_TEXT.closeMenu : SITE_TEXT.openMenu}
        onClick={() => setIsOpen((current) => !current)}
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon-lg' }), HEADER_GHOST_CLASS)}
      >
        {isOpen ? <XIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
      </button>

      <nav
        id={panelId}
        aria-label={SITE_TEXT.mobileNavLabel}
        className={cn(
          'absolute inset-x-0 top-full transition-[opacity,translate,display] duration-(--motion-duration) ease-(--motion-ease) transition-discrete starting:-translate-y-2 starting:opacity-0 border-t border-border bg-header px-4 py-3 shadow-md sm:px-8',
          !isOpen && 'hidden -translate-y-2 opacity-0',
        )}
      >
        <ul className="mx-auto max-w-6xl space-y-1">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <AppNavLink to={link.to} className={MOBILE_LINK_CLASS} onClick={close}>
                {link.label}
              </AppNavLink>
            </li>
          ))}
          <li className="sm:hidden">
            <AppLink to={secondaryLink.to} className={MOBILE_LINK_CLASS} onClick={close}>
              {secondaryLink.label}
            </AppLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
