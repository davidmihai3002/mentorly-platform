import { InfoDialog } from '@/components'
import { AppLink } from '@/components/navigation'
import { DIALOG_OUTLINE_CLASS, DIALOG_PRIMARY_CLASS, ROUTES } from '@/constants'
import { LOGIN_TEXT } from '../constants'

type RoleChoiceDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RoleChoiceDialog({ open, onOpenChange }: RoleChoiceDialogProps) {
  return (
    <InfoDialog
      title={LOGIN_TEXT.roleTitle}
      description={LOGIN_TEXT.roleText}
      open={open}
      onOpenChange={onOpenChange}
      isDismissedByOutsideClick={false}
      actions={
        <>
          <AppLink to={ROUTES.student} className={DIALOG_PRIMARY_CLASS}>
            {LOGIN_TEXT.roleStudent}
          </AppLink>
          <AppLink to={ROUTES.mentor} className={DIALOG_OUTLINE_CLASS}>
            {LOGIN_TEXT.roleMentor}
          </AppLink>
        </>
      }
    />
  )
}
