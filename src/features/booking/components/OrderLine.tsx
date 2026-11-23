import { cn } from 'cn'

type OrderLineProps = {
  label: string
  value: string
  isTotal?: boolean
}

export function OrderLine({ label, value, isTotal = false }: OrderLineProps) {
  return (
    <div
      className={cn(
        'flex justify-between gap-3 text-[13px]',
        isTotal && 'border-t border-border pt-3 font-bold',
      )}
    >
      <dt className={cn(!isTotal && 'text-foreground')}>{label}</dt>
      <dd className="font-semibold text-foreground">{value}</dd>
    </div>
  )
}
