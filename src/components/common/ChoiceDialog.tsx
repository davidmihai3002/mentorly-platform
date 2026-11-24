import { cn } from 'cn'
import type { ReactElement } from 'react'
import { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui'
import { SITE_TEXT } from '@/constants'

type ChoiceOption = {
  readonly value: string
  readonly label: string
  readonly decoration?: string
}

type ChoiceDialogProps = {
  title: string
  options: readonly ChoiceOption[]
  value?: string
  trigger?: ReactElement
  open?: boolean
  onOpenChange?: (open: boolean) => void
  cancelLabel?: string
  onChange: (value: string) => void
}

const OPTION_CLASS =
  'flex min-h-9 w-full items-center justify-center rounded-[20px] border border-brand-navy-border bg-card px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none'

export function ChoiceDialog({
  title,
  options,
  value,
  trigger,
  open,
  onOpenChange,
  cancelLabel,
  onChange,
}: ChoiceDialogProps) {
  const [ownOpen, setOwnOpen] = useState(false)
  const isOpen = open ?? ownOpen

  function setIsOpen(next: boolean) {
    setOwnOpen(next)
    onOpenChange?.(next)
  }

  function choose(next: string) {
    onChange(next)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger render={trigger} />}
      <DialogContent
        showCloseButton={false}
        className="gap-3 rounded-[16px] border border-border bg-card p-6 shadow-card-soft ring-0 sm:max-w-[430px]"
      >
        <DialogTitle className="text-xl leading-[1.2] font-bold tracking-[-0.02em] text-foreground">
          {title}
        </DialogTitle>
        <ul className="flex flex-col gap-3">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                aria-pressed={option.value === value}
                onClick={() => choose(option.value)}
                className={cn(
                  OPTION_CLASS,
                  'aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground',
                )}
              >
                {option.decoration && <span aria-hidden="true">{option.decoration}</span>}
                {option.label}
              </button>
            </li>
          ))}
        </ul>
        {cancelLabel ? (
          <DialogClose className={OPTION_CLASS}>{cancelLabel}</DialogClose>
        ) : (
          <DialogClose className="w-fit rounded-sm text-xs font-medium text-foreground hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none">
            {SITE_TEXT.closeWithoutChanges} <span aria-hidden="true">×</span>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  )
}
