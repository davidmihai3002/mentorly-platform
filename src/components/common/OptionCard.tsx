import type { ChangeEvent } from 'react'

type OptionCardProps = {
  name: string
  value: string
  title: string
  description?: string
  checked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function OptionCard({
  name,
  value,
  title,
  description,
  checked,
  onChange,
}: OptionCardProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-card p-3.5 transition-colors has-checked:border-primary has-checked:bg-selected has-focus-visible:ring-3 has-focus-visible:ring-ring/50">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className="mt-1.5 grid size-2.5 shrink-0 place-items-center rounded-full border border-primary peer-checked:bg-primary"
      />
      <span className="flex flex-col gap-1">
        <span className="text-[13px] font-semibold text-foreground">{title}</span>
        {description && <span className="text-xs text-muted-foreground">{description}</span>}
      </span>
    </label>
  )
}
