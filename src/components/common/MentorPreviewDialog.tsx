import { AppLink } from '@/components/navigation'
import { DialogClose } from '@/components/ui'
import { DIALOG_OUTLINE_CLASS, DIALOG_PRIMARY_CLASS, MENTOR_PREVIEW_TEXT } from '@/constants'
import type { Mentor } from '@/types'
import { findDomain, formatSessionPrice, getMentorProfilePath } from '@/utils'
import { InfoDialog } from './InfoDialog'

type MentorPreviewDialogProps = {
  mentor: Mentor | null
  onClose: () => void
}

export function MentorPreviewDialog({ mentor, onClose }: MentorPreviewDialogProps) {
  return (
    <InfoDialog
      title={MENTOR_PREVIEW_TEXT.title}
      open={mentor !== null}
      onOpenChange={(open) => !open && onClose()}
      actions={
        mentor && (
          <>
            <AppLink
              to={`${getMentorProfilePath(mentor.id)}#${MENTOR_PREVIEW_TEXT.applyAnchor}`}
              className={DIALOG_PRIMARY_CLASS}
            >
              {MENTOR_PREVIEW_TEXT.apply}
            </AppLink>
            <DialogClose className={DIALOG_OUTLINE_CLASS}>{MENTOR_PREVIEW_TEXT.back}</DialogClose>
          </>
        )
      }
    >
      {mentor && (
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold text-foreground">{mentor.name}</p>
          <p className="text-[13px] font-medium text-link">{mentor.role}</p>
          <p className="text-[11px] text-muted-foreground">
            {mentor.domainLabel ?? findDomain(mentor.domainId)?.label}
          </p>
          <p className="text-xs text-muted-foreground">{MENTOR_PREVIEW_TEXT.summary}</p>
          <p className="text-base font-bold text-foreground">
            {formatSessionPrice(mentor.pricePerSession)}
          </p>
        </div>
      )}
    </InfoDialog>
  )
}
