import { useLocation } from 'react-router'
import { SITE_TEXT } from '@/constants'
import { getAccountHome } from '@/utils'
import { AccountActions } from './AccountActions'
import { MobileNavMenu } from './MobileNavMenu'
import { PublicNavLinks } from './PublicNavLinks'
import { SiteHeader } from './SiteHeader'

export function AccountHeader() {
  const { pathname } = useLocation()
  const homePath = getAccountHome(pathname)

  return (
    <SiteHeader>
      <PublicNavLinks />
      <div className="flex items-center gap-1">
        <AccountActions homePath={homePath} />
        <MobileNavMenu secondaryLink={{ label: SITE_TEXT.accountMenu, to: homePath }} />
      </div>
    </SiteHeader>
  )
}
