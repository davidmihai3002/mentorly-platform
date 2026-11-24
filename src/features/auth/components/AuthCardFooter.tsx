import { cn } from 'cn'
import { AppLink } from '@/components/navigation'
import { buttonVariants } from '@/components/ui'
import { ROUTES } from '@/constants'
import { AUTH_LINK_CLASS, LOGIN_TEXT } from '../constants'

const LINK_CLASS = cn(buttonVariants({ variant: 'link' }), AUTH_LINK_CLASS)

export function AuthCardFooter() {
  return (
    <div className="space-y-1 text-[13px] leading-[1.25] text-foreground">
      <p>
        {LOGIN_TEXT.noAccount}{' '}
        <AppLink to={ROUTES.signup} className={LINK_CLASS}>
          {LOGIN_TEXT.registerMentee}
        </AppLink>
      </p>
      <p>
        <AppLink to={ROUTES.mentorSignup} className={LINK_CLASS}>
          {LOGIN_TEXT.registerMentor}
        </AppLink>
      </p>
    </div>
  )
}
