import { cn } from 'cn'
import { useId, type ChangeEvent } from 'react'

type OptionCardProps = {
  name: string
  value: string
  title: string
  description?: string
  checked: boolean
  disabled?: boolean
  size?: 'compact' | 'regular'
  isInvalid?: boolean

  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function OptionCard({
  name,
  value,
  title,
  description,
  checked,
  disabled,
  size = 'compact',
  isInvalid = false,

  onChange,
}: OptionCardProps) {
  const titleId = useId()
  const descriptionId = useId()

  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card transition-colors has-checked:border-primary has-checked:bg-selected has-disabled:cursor-not-allowed has-disabled:opacity-50 has-focus-visible:ring-3 has-focus-visible:ring-ring',
        size === 'compact' ? 'p-3.5' : 'px-4 py-[15px]',
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        aria-invalid={isInvalid || undefined}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="mt-1.5 grid size-2.5 shrink-0 place-items-center rounded-full border border-primary peer-checked:bg-primary"
      />
      <span className="flex flex-col gap-1">
        <span
          id={titleId}
          className={cn(
            'text-foreground',
            size === 'compact'
              ? 'text-[13px] font-semibold'
              : 'text-[15px] leading-[1.45] font-medium tracking-[-0.02em]',
          )}
        >
          {title}
        </span>
        {description && (
          <span
            id={descriptionId}
            className={cn('text-muted-foreground', size === 'compact' ? 'text-xs' : 'text-[13px]')}
          >
            {description}
          </span>
        )}
      </span>
    </label>
  )
}
