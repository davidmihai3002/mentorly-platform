import { Outlet } from 'react-router'
import { AccountHeader, SiteFooter } from '@/components'
import { MAIN_CONTENT_ID } from '@/constants'

export function AccountLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <AccountHeader />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="outline-none [view-transition-name:page-content] mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-8"
      >
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
