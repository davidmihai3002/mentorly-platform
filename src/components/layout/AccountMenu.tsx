import { cn } from 'cn'
import { ChevronDownIcon, LogOutIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import {
  buttonVariants,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { ROUTES, SITE_TEXT } from '@/constants'

export function AccountMenu() {
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 gap-1.5 px-3 text-sm font-medium text-header-foreground hover:bg-header-foreground/10 hover:text-header-foreground focus-visible:ring-header-foreground/60 aria-expanded:bg-header-foreground/10 aria-expanded:text-header-foreground',
        )}
      >
        {SITE_TEXT.accountMenu}
        <ChevronDownIcon aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuItem onClick={() => void navigate(ROUTES.login, { viewTransition: true })}>
          <LogOutIcon aria-hidden="true" />
          {SITE_TEXT.logout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
