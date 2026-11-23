import { ExternalLink } from 'lucide-react'
import { PROFILE_LINK_CLASS, PROFILE_TEXT } from '../constants'
import type { ExternalLink as ExternalLinkType } from '../types'

type ExternalLinkItemProps = {
  link: ExternalLinkType
}

export function ExternalLinkItem({ link }: ExternalLinkItemProps) {
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={PROFILE_LINK_CLASS}>
      {link.label}
      <ExternalLink aria-hidden="true" className="size-3.5" />
      <span className="sr-only">{PROFILE_TEXT.opensInNewTab}</span>
    </a>
  )
}
