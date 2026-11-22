import { Outlet } from 'react-router'
import { GuestHeader, PageBackdrop, SiteFooter } from '@/components'
import { MAIN_CONTENT_ID } from '@/constants'

export function PublicLayout() {
  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <PageBackdrop />
      <GuestHeader />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="relative z-10 flex flex-1 flex-col outline-none [view-transition-name:page-content]"
      >
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
