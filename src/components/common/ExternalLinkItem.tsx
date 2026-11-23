import { cn } from 'cn'
import { ExternalLink } from 'lucide-react'
import { SITE_TEXT } from '@/constants'

type ExternalLinkItemProps = {
  link: { readonly label: string; readonly href: string }
  className?: string
}

export function ExternalLinkItem({ link, className }: ExternalLinkItemProps) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-1 rounded-sm text-[13px] text-link transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none',
        className,
      )}
    >
      {link.label}
      <ExternalLink aria-hidden="true" className="size-3.5" />
      <span className="sr-only">{SITE_TEXT.opensInNewTab}</span>
    </a>
  )
}
