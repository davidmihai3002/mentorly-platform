import type { ReactElement, ReactNode } from 'react'
import { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'
import { SITE_TEXT } from '@/constants'

type InfoDialogProps = {
  title: string
  description?: ReactNode
  children?: ReactNode
  actions?: ReactNode
  trigger?: ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
  isDismissedByOutsideClick?: boolean
}

export function InfoDialog({
  title,
  description,
  children,
  actions,
  trigger,
  open,
  onOpenChange,
  isDismissedByOutsideClick = true,
}: InfoDialogProps) {
  const [ownOpen, setOwnOpen] = useState(false)

  function setIsOpen(next: boolean) {
    setOwnOpen(next)
    onOpenChange?.(next)
  }

  return (
    <Dialog
      open={open ?? ownOpen}
      onOpenChange={setIsOpen}
      disablePointerDismissal={!isDismissedByOutsideClick}
    >
      {trigger && <DialogTrigger render={trigger} />}
      <DialogContent
        showCloseButton={false}
        className="gap-3 rounded-[16px] border border-border bg-card p-6 shadow-card-soft ring-0 sm:max-w-[430px]"
      >
        <DialogClose className="justify-self-end rounded-sm text-[11px] font-medium text-link hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none">
          {SITE_TEXT.close} <span aria-hidden="true">×</span>
        </DialogClose>
        <DialogTitle className="text-xl leading-[1.2] font-bold tracking-[-0.02em] text-foreground">
          {title}
        </DialogTitle>
        {description && (
          <DialogDescription className="text-[13px] leading-[1.5] text-muted-foreground">
            {description}
          </DialogDescription>
        )}
        {children}
        {actions && <div className="flex flex-col gap-3 pt-1">{actions}</div>}
      </DialogContent>
    </Dialog>
  )
}
