import type { ReactElement } from 'react'
import { AppLink, InfoDialog } from '@/components'
import { DialogClose } from '@/components/ui'
import { DIALOG_OUTLINE_CLASS, DIALOG_PRIMARY_CLASS } from '@/constants'
import type { DirectoryMentor } from '@/types'
import { getBookingPath, getFirstName, getReschedulePath } from '@/utils'
import { STUDENT_PROFILE_TEXT } from '../constants'
import type { UpcomingSession } from '../types'

type SessionDetailsDialogProps = {
  mentor: DirectoryMentor
  session: UpcomingSession
  trigger: ReactElement
}

export function SessionDetailsDialog({ mentor, session, trigger }: SessionDetailsDialogProps) {
  return (
    <InfoDialog
      title={STUDENT_PROFILE_TEXT.sessionDialogTitle(getFirstName(mentor.name))}
      trigger={trigger}
      actions={
        <>
          <AppLink
            to={getReschedulePath(mentor.id, session.date, session.start)}
            className={DIALOG_PRIMARY_CLASS}
          >
            {STUDENT_PROFILE_TEXT.sessionReschedule}
          </AppLink>
          <AppLink to={getBookingPath(mentor.id)} className={DIALOG_OUTLINE_CLASS}>
            {STUDENT_PROFILE_TEXT.sessionBookExtra}
          </AppLink>
          <DialogClose className={DIALOG_OUTLINE_CLASS}>
            {STUDENT_PROFILE_TEXT.sessionBack}
          </DialogClose>
        </>
      }
    >
      <p className="text-sm leading-[1.6] font-medium text-link">
        {session.label}
        <br />
        {STUDENT_PROFILE_TEXT.sessionDialogMeta}
      </p>
      <p className="text-xs leading-[1.6] text-foreground">
        {STUDENT_PROFILE_TEXT.sessionDialogText(mentor.pricePerSession)}
      </p>
    </InfoDialog>
  )
}
