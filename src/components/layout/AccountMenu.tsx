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
import { HEADER_GHOST_CLASS, ROUTES, SITE_TEXT } from '@/constants'

export function AccountMenu() {
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          HEADER_GHOST_CLASS,
          'h-9 gap-1.5 px-3 text-sm font-medium',
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
