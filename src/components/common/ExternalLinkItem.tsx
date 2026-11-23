import { cn } from 'cn'
import { ExternalLink } from 'lucide-react'
import { SITE_TEXT, TEXT_LINK_CLASS } from '@/constants'

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
      className={cn(TEXT_LINK_CLASS, className)}
    >
      {link.label}
      <ExternalLink aria-hidden="true" className="size-3.5" />
      <span className="sr-only">{SITE_TEXT.opensInNewTab}</span>
    </a>
  )
}
