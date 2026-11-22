import { AppLink } from '@/components/navigation'
import { ROUTES, SITE_TEXT } from '@/constants'

export function MentorlyLogo() {
  return (
    <AppLink
      to={ROUTES.home}
      className="inline-flex items-center rounded-md text-header-foreground select-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
      aria-label={SITE_TEXT.brand}
    >
      <svg
        className="h-6 w-auto sm:h-9"
        viewBox="0 0 136 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="9.5" cy="8.5" r="2.5" className="fill-primary" />
        <path
          d="M14 9.5C19.5 4.5 27.5 4.5 33 9.5"
          className="stroke-primary"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <text
          x="2"
          y="27"
          fill="currentColor"
          fontFamily="'Roboto Variable', sans-serif"
          fontWeight="700"
          fontSize="24"
          letterSpacing="-0.03em"
        >
          {SITE_TEXT.brand}
        </text>
      </svg>
    </AppLink>
  )
}
