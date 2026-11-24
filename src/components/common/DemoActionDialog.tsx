import type { ReactElement } from 'react'
import { DialogClose } from '@/components/ui'
import { DIALOG_OUTLINE_CLASS, SITE_TEXT } from '@/constants'
import { InfoDialog } from './InfoDialog'

type DemoActionDialogProps = {
  trigger: ReactElement
}

export function DemoActionDialog({ trigger }: DemoActionDialogProps) {
  return (
    <InfoDialog
      title={SITE_TEXT.demoActionTitle}
      description={SITE_TEXT.demoActionText}
      trigger={trigger}
      actions={<DialogClose className={DIALOG_OUTLINE_CLASS}>{SITE_TEXT.understood}</DialogClose>}
    />
  )
}
