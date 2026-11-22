import { Outlet } from 'react-router'
import { GuestHeader, PageBackdrop, SiteFooter } from '@/components'
import { MAIN_CONTENT_ID } from '@/constants'

export function AuthLayout() {
  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <PageBackdrop />
      <GuestHeader />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="outline-none relative z-10 flex flex-1 items-center justify-center px-4 py-8"
      >
        <div className="w-full max-w-[338px] space-y-5 rounded-2xl border border-border bg-card px-6 pt-10 pb-6 shadow-card [view-transition-name:auth-card]">
          <Outlet />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
