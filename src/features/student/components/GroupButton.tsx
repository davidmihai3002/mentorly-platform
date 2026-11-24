import { cn } from 'cn'
import { DemoActionDialog } from '@/components'
import { ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, SITE_TEXT } from '@/constants'
import { STUDENT_PROFILE_TEXT } from '../constants'

type GroupButtonProps = {
  url?: string
}

const GROUP_BUTTON_CLASS = cn(ROUNDED_BUTTON_CLASS, ROUNDED_PRIMARY_CLASS, 'min-h-9 text-sm')

export function GroupButton({ url }: GroupButtonProps) {
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={GROUP_BUTTON_CLASS}>
        {STUDENT_PROFILE_TEXT.openGroup}
        <span className="sr-only">{SITE_TEXT.opensInNewTab}</span>
      </a>
    )
  }

  return (
    <DemoActionDialog
      trigger={
        <button type="button" className={GROUP_BUTTON_CLASS}>
          {STUDENT_PROFILE_TEXT.openGroup}
        </button>
      }
    />
  )
}
