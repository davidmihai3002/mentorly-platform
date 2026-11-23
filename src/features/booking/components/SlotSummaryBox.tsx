import { cn } from 'cn'

type SlotSummaryBoxProps = {
  label: string
  date: string
  time: string
  isHighlighted?: boolean
}

export function SlotSummaryBox({ label, date, time, isHighlighted = false }: SlotSummaryBoxProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-1 rounded-[12px] border p-4',
        isHighlighted
          ? 'border-border-soft bg-selected text-link'
          : 'border-border bg-background/60 text-muted-foreground',
      )}
    >
      <span className="text-[11px]">{label}</span>
      <span className={cn('text-lg leading-[1.3]', isHighlighted && 'font-bold')}>
        {date}
        <br />
        {time}
      </span>
    </div>
  )
}
