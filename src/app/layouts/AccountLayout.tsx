import { Outlet } from 'react-router'
import { cn } from 'cn'
import { AccountHeader, PageBackdrop, SiteFooter } from '@/components'
import { LAYOUT_CONTAINER_CLASS, MAIN_CONTENT_ID } from '@/constants'

export function AccountLayout() {
  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <PageBackdrop />
      <AccountHeader />
      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className={cn(
          LAYOUT_CONTAINER_CLASS,
          'relative z-10 flex flex-1 flex-col py-8 outline-none [view-transition-name:page-content]',
        )}
      >
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
