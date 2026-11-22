import { useId, type ChangeEvent } from 'react'

type OptionCardProps = {
  name: string
  value: string
  title: string
  description?: string
  checked: boolean
  disabled?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function OptionCard({
  name,
  value,
  title,
  description,
  checked,
  disabled,
  onChange,
}: OptionCardProps) {
  const descriptionId = useId()

  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-3.5 transition-colors has-checked:border-primary has-checked:bg-selected has-disabled:cursor-not-allowed has-disabled:opacity-50 has-focus-visible:ring-3 has-focus-visible:ring-ring">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        aria-describedby={description ? descriptionId : undefined}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="mt-1.5 grid size-2.5 shrink-0 place-items-center rounded-full border border-primary peer-checked:bg-primary"
      />
      <span className="flex flex-col gap-1">
        <span className="text-[13px] font-semibold text-foreground">{title}</span>
        {description && (
          <span id={descriptionId} className="text-xs text-muted-foreground">
            {description}
          </span>
        )}
      </span>
    </label>
  )
}
