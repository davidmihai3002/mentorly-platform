import { CircleUserIcon, LogOutIcon, MenuIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { PATHS } from './paths'

/** Numele aplicației, ca link (folosit în toate header-ele). */
export function BrandLink({ to }: { to: string }) {
  return (
    <Link to={to} className="font-heading text-lg font-extrabold tracking-tight">
      Mentorly
    </Link>
  )
}

const REGISTER_LINKS = [
  { to: PATHS.registerMentee, label: 'Înregistrează-te ca mentorat' },
  { to: PATHS.registerMentor, label: 'Înregistrează-te ca mentor' },
] as const

/** Header-ul paginilor publice. */
export function SiteHeader() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <BrandLink to={PATHS.home} />

        <nav aria-label="Navigație principală" className="flex-1">
          <Button asChild variant="ghost">
            <Link to={PATHS.mentors}>Caută mentori</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          {REGISTER_LINKS.map((link) => (
            <Button key={link.to} asChild variant="outline" className="hidden md:inline-flex">
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}

          {/* Pe ecrane mici, înregistrarea intră într-un meniu, ca header-ul să încapă. */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Înregistrare">
                <MenuIcon aria-hidden />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {REGISTER_LINKS.map((link) => (
                <DropdownMenuItem key={link.to} asChild>
                  <Link to={link.to}>{link.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild>
            <Link to={PATHS.login}>Login</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

/** Meniul contului din layout-urile autentificate. */
export function AccountMenu() {
  const navigate = useNavigate()

  // Deocamdată doar duce la login. SCRUM-277 (contextul de autentificare) adaugă aici
  // invalidarea sesiunii, înainte de navigare.
  const handleLogout = () => {
    // replace: după logout, butonul Înapoi nu mai duce în panou.
    void navigate(PATHS.login, { replace: true })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <CircleUserIcon aria-hidden />
          Contul meu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOutIcon aria-hidden />
          Deconectare
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
