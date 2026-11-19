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
        <div className="w-full max-w-[440px] space-y-5 rounded-2xl border border-border/80 bg-card p-6 shadow-lg sm:p-8">
          <Outlet />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
