import type { ReactElement } from 'react'
import { InfoDialog } from '@/components'
import { DialogClose } from '@/components/ui'
import { DIALOG_OUTLINE_CLASS, DIALOG_PRIMARY_CLASS } from '@/constants'
import { INTRO_CALL_MINUTES, PROFILE_TEXT } from '../constants'

type IntroCallDialogProps = {
  mentorName: string
  slotLabel: string
  trigger: ReactElement
  onConfirm: () => void
}

export function IntroCallDialog({
  mentorName,
  slotLabel,
  trigger,
  onConfirm,
}: IntroCallDialogProps) {
  return (
    <InfoDialog
      title={PROFILE_TEXT.introDialogTitle}
      trigger={trigger}
      actions={
        <>
          <DialogClose className={DIALOG_PRIMARY_CLASS} onClick={onConfirm}>
            {PROFILE_TEXT.introConfirm}
          </DialogClose>
          <DialogClose className={DIALOG_OUTLINE_CLASS}>{PROFILE_TEXT.introCancel}</DialogClose>
        </>
      }
    >
      <p className="text-sm font-medium text-foreground">
        {PROFILE_TEXT.introSubject(mentorName, INTRO_CALL_MINUTES)}
      </p>
      <p className="text-xs leading-[1.6] text-link">
        {slotLabel}
        <br />
        {PROFILE_TEXT.introFormat}
        <br />
        {PROFILE_TEXT.introFree}
      </p>
    </InfoDialog>
  )
}
