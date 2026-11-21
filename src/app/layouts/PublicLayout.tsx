import { Outlet } from 'react-router'
import { GuestHeader, SiteFooter } from '@/components'
import { MAIN_CONTENT_ID } from '@/constants'

export function PublicLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <GuestHeader />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="flex flex-1 flex-col outline-none [view-transition-name:page-content]"
      >
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
