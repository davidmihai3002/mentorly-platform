import { InfoDialog } from '@/components'
import { AppLink } from '@/components/navigation'
import { DialogClose } from '@/components/ui'
import { DIALOG_OUTLINE_CLASS, DIALOG_PRIMARY_CLASS, ROUTES } from '@/constants'
import { PROFILE_TEXT } from '../constants'

type ApplicationSentDialogProps = {
  mentorName: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ApplicationSentDialog({
  mentorName,
  open,
  onOpenChange,
}: ApplicationSentDialogProps) {
  return (
    <InfoDialog
      title={PROFILE_TEXT.sentTitle}
      open={open}
      onOpenChange={onOpenChange}
      actions={
        <>
          <DialogClose className={DIALOG_OUTLINE_CLASS}>{PROFILE_TEXT.sentClose}</DialogClose>
          <AppLink to={ROUTES.mentors} className={DIALOG_PRIMARY_CLASS}>
            {PROFILE_TEXT.sentExplore}
          </AppLink>
        </>
      }
    >
      <p className="text-sm font-medium text-foreground">{mentorName}</p>
      <p className="text-xs leading-[1.6] text-link">{PROFILE_TEXT.sentText}</p>
    </InfoDialog>
  )
}
