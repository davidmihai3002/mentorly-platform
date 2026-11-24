import { DemoActionDialog } from '@/components'
import { SITE_TEXT } from '@/constants'
import { GROUP_BUTTON_CLASS, STUDENT_PROFILE_TEXT } from '../constants'
import { getSafeGroupUrl } from '../utils'

type GroupButtonProps = {
  url: string
  describedBy?: string
}

export function GroupButton({ url, describedBy }: GroupButtonProps) {
  const safeUrl = getSafeGroupUrl(url)

  if (safeUrl) {
    return (
      <a
        href={safeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={describedBy}
        className={GROUP_BUTTON_CLASS}
      >
        {STUDENT_PROFILE_TEXT.openGroup}
        <span className="sr-only">{SITE_TEXT.opensInNewTab}</span>
      </a>
    )
  }

  return (
    <DemoActionDialog
      trigger={
        <button type="button" aria-describedby={describedBy} className={GROUP_BUTTON_CLASS}>
          {STUDENT_PROFILE_TEXT.openGroup}
        </button>
      }
    />
  )
}
