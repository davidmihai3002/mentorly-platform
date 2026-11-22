import { AppLink } from '@/components'
import { ARROW_LINK_CLASS } from '../constants'
import type { ArrowLinkTarget } from '../types'

type ArrowLinkProps = {
  link: ArrowLinkTarget
  describedBy?: string
}

export function ArrowLink({ link, describedBy }: ArrowLinkProps) {
  const content = (
    <>
      {link.label} <span aria-hidden="true">→</span>
    </>
  )

  if (!link.to) {
    return <span className={ARROW_LINK_CLASS}>{content}</span>
  }

  return (
    <AppLink to={link.to} aria-describedby={describedBy} className={ARROW_LINK_CLASS}>
      {content}
    </AppLink>
  )
}
