import { Button } from '@/components/ui'
import { LOGIN_TEXT } from '../constants'
import { MentorlyLogo } from './MentorlyLogo'

type AuthNavbarProps = {
  onLoginClick: () => void
  onRegisterClick: () => void
}

export function AuthNavbar({ onLoginClick, onRegisterClick }: AuthNavbarProps) {
  return (
    <header className="relative z-10 border-b border-border/60 bg-card/90 backdrop-blur-xs">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-8">
        <MentorlyLogo />

        <nav aria-label="Navigare principală" className="hidden items-center gap-8 md:flex">
          {LOGIN_TEXT.navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            className="h-9 px-3 text-sm font-medium text-foreground hover:bg-transparent hover:text-primary"
            onClick={onLoginClick}
          >
            {LOGIN_TEXT.navLogin}
          </Button>
          <Button
            type="button"
            className="h-9 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90"
            onClick={onRegisterClick}
          >
            {LOGIN_TEXT.navRegister}
          </Button>
        </div>
      </div>
    </header>
  )
}
