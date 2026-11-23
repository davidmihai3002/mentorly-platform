import { ChevronDown } from 'lucide-react'
import { useId } from 'react'
import { ChoiceDialog } from '@/components'
import { FILTER_DIALOG_TITLES, FILTER_LABELS, FILTER_OPTIONS, SEARCH_TEXT } from '../constants'
import type { FilterKey } from '../types'

type FilterFieldProps = {
  filterKey: FilterKey
  value?: string
  onChange: (value: string) => void
}

export function FilterField({ filterKey, value, onChange }: FilterFieldProps) {
  const labelId = useId()
  const valueId = useId()
  const selected = FILTER_OPTIONS[filterKey].find((option) => option.value === value)

  return (
    <div className="flex flex-col gap-2">
      <span id={labelId} className="text-[13px] font-semibold tracking-[-0.02em] text-foreground">
        {FILTER_LABELS[filterKey]}
      </span>
      <ChoiceDialog
        title={FILTER_DIALOG_TITLES[filterKey]}
        options={FILTER_OPTIONS[filterKey]}
        value={value}
        onChange={onChange}
        trigger={
          <button
            type="button"
            aria-labelledby={`${labelId} ${valueId}`}
            className="flex h-10 w-full items-center justify-between gap-2 rounded-[10px] border border-border bg-card px-3 text-left text-[13px] text-foreground transition-colors hover:border-primary/50 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <span id={valueId} className={selected ? undefined : 'text-muted-foreground'}>
              {selected?.label ?? SEARCH_TEXT.anyOption}
            </span>
            <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
          </button>
        }
      />
    </div>
  )
}
