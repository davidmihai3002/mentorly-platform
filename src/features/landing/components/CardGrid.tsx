import { cn } from 'cn'
import type { ReactNode } from 'react'

type CardGridProps<Item> = {
  items: readonly Item[]
  getKey: (item: Item) => string
  renderItem: (item: Item, index: number) => ReactNode
  className?: string
}

export function CardGrid<Item>({ items, getKey, renderItem, className }: CardGridProps<Item>) {
  return (
    <ul className={cn('grid gap-5 md:grid-cols-3', className)}>
      {items.map((item, index) => (
        <li key={getKey(item)} className="flex">
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  )
}
