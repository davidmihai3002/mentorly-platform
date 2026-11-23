import { cn } from 'cn'
import { LayoutGrid, List } from 'lucide-react'
import { SEARCH_TEXT } from '../constants'
import type { ViewId } from '../types'

type ViewToggleProps = {
  view: ViewId
  onChange: (view: ViewId) => void
}

const VIEWS = [
  { id: 'grid', label: SEARCH_TEXT.grid, icon: LayoutGrid },
  { id: 'list', label: SEARCH_TEXT.list, icon: List },
] as const

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div role="group" aria-label={SEARCH_TEXT.viewLabel} className="flex gap-1">
      {VIEWS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          aria-pressed={view === id}
          onClick={() => onChange(id)}
          className={cn(
            'inline-flex h-7 items-center gap-1 rounded-[14px] px-2.5 text-[11px] font-medium text-foreground transition-colors focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none',
            'bg-card hover:bg-muted aria-pressed:bg-primary aria-pressed:text-primary-foreground',
          )}
        >
          <Icon aria-hidden="true" className="size-3.5" />
          {label}
        </button>
      ))}
    </div>
  )
}
