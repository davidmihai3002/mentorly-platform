import type { ReactNode } from 'react'
import { NavLink, Outlet, ScrollRestoration, useNavigation } from 'react-router'
import { cn } from '@/lib/utils'
import { AccountMenu, BrandLink, SiteHeader } from './header'
import { MAIN_CONTENT_ID, PATHS } from './paths'

/** Vizibil doar la navigarea cu tastatura: sare peste header, direct la conținut. */
function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:shadow"
    >
      Sari la conținut
    </a>
  )
}

function MainContent({ className, children }: { className: string; children: ReactNode }) {
  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className={cn('focus:outline-none', className)}>
      {children}
    </main>
  )
}

const PAGE_WIDTH = 'mx-auto w-full max-w-6xl flex-1 px-4 py-8'

/** Rădăcina: scroll restaurat la navigare + bară de progres cât se încarcă pagina următoare. */
export function RootLayout() {
  const isLoading = useNavigation().state === 'loading'
  return (
    <>
      <SkipLink />
      {isLoading && (
        <div
          role="progressbar"
          aria-label="Se încarcă pagina"
          className="fixed inset-x-0 top-0 z-50 h-0.5 animate-pulse bg-primary"
        />
      )}
      <Outlet />
      <ScrollRestoration />
    </>
  )
}

/** Paginile publice: landing, căutare, profil mentor, FAQ, 404. */
export function PublicLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <MainContent className={PAGE_WIDTH}>
        <Outlet />
      </MainContent>
    </div>
  )
}

/** Login și înregistrare: fără navigație, ca utilizatorul să se concentreze pe formular. */
export function AuthLayout() {
  return (
    <div className="flex min-h-svh flex-col items-center bg-muted/40 px-4 py-10">
      <header>
        <BrandLink to={PATHS.home} />
      </header>
      <MainContent className="mt-8 w-full max-w-md rounded-2xl bg-background p-6 shadow-sm">
        <Outlet />
      </MainContent>
    </div>
  )
}

type NavItem = { to: string; label: string }

function DashboardLayout({
  navLabel,
  homePath,
  items,
}: {
  navLabel: string
  homePath: string
  items: readonly NavItem[]
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
          <BrandLink to={homePath} />
          <nav aria-label={navLabel} className="flex flex-1 gap-1">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-medium hover:bg-muted',
                    isActive && 'bg-muted',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <AccountMenu />
        </div>
      </header>
      <MainContent className={PAGE_WIDTH}>
        <Outlet />
      </MainContent>
    </div>
  )
}

const MENTEE_NAV = [{ to: PATHS.menteeDashboard, label: 'Panou' }] as const
const MENTOR_NAV = [{ to: PATHS.mentorDashboard, label: 'Panou' }] as const

/** Zona cursantului. Protecția pe rol vine în SCRUM-278. */
export function MenteeLayout() {
  return (
    <DashboardLayout navLabel="Meniu cursant" homePath={PATHS.menteeDashboard} items={MENTEE_NAV} />
  )
}

/** Zona mentorului. Protecția pe rol vine în SCRUM-278. */
export function MentorLayout() {
  return (
    <DashboardLayout navLabel="Meniu mentor" homePath={PATHS.mentorDashboard} items={MENTOR_NAV} />
  )
}
