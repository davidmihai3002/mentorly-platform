import { LOGIN_TEXT } from '../constants'

export function AuthFooter() {
  return (
    <footer className="relative z-10 mt-auto">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-8">
        <p>{LOGIN_TEXT.copyright}</p>

        <nav aria-label="Linkuri utile" className="flex items-center gap-6">
          {LOGIN_TEXT.footerLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="transition-colors hover:text-foreground"
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
