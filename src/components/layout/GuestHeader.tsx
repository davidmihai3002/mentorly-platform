import { ROUTES, SITE_TEXT } from '@/constants'
import { GuestActions } from './GuestActions'
import { MobileNavMenu } from './MobileNavMenu'
import { PublicNavLinks } from './PublicNavLinks'
import { SiteHeader } from './SiteHeader'

export function GuestHeader() {
  return (
    <SiteHeader>
      <PublicNavLinks />
      <div className="flex items-center gap-1">
        <GuestActions />
        <MobileNavMenu secondaryLink={{ label: SITE_TEXT.login, to: ROUTES.login }} />
      </div>
    </SiteHeader>
  )
}
