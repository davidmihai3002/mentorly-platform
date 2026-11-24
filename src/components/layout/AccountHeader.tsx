import { SITE_TEXT } from '@/constants'
import { useSession } from '@/session'
import { getAccountHome } from '@/utils'
import { AccountActions } from './AccountActions'
import { GuestHeader } from './GuestHeader'
import { MobileNavMenu } from './MobileNavMenu'
import { PublicNavLinks } from './PublicNavLinks'
import { SiteHeader } from './SiteHeader'

export function AccountHeader() {
  const { user } = useSession()
  if (!user) return <GuestHeader />

  const homePath = getAccountHome(user.role)

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
