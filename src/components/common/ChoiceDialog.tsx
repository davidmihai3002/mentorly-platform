import { cn } from 'cn'
import type { ReactElement } from 'react'
import { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui'
import { SITE_TEXT } from '@/constants'

type ChoiceOption = {
  readonly value: string
  readonly label: string
}

type ChoiceDialogProps = {
  title: string
  options: readonly ChoiceOption[]
  value?: string
  trigger: ReactElement
  onChange: (value: string) => void
}

export function ChoiceDialog({ title, options, value, trigger, onChange }: ChoiceDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  function choose(next: string) {
    onChange(next)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={trigger} />
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
                  'flex min-h-9 w-full items-center justify-center rounded-[20px] border border-brand-navy-border bg-card px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none',
                  'aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground',
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
        <DialogClose className="w-fit rounded-sm text-xs font-medium text-foreground hover:text-primary focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none">
          {SITE_TEXT.closeWithoutChanges} <span aria-hidden="true">×</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
