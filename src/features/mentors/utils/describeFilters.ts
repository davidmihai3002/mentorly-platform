import { FILTER_OPTIONS } from '../constants'
import type { ActiveFilter, FilterKey, MentorFilters } from '../types'

const CHIP_LABELS: Readonly<Partial<Record<FilterKey, (value: string) => string>>> = {
  maxPrice: (value) => `≤ ${value} lei`,
}

export function describeFilters(filters: MentorFilters): readonly ActiveFilter[] {
  return (Object.keys(FILTER_OPTIONS) as FilterKey[]).flatMap((key) => {
    const value = filters[key]
    if (value === undefined) return []
    const raw = String(value)
    const label =
      CHIP_LABELS[key]?.(raw) ??
      FILTER_OPTIONS[key].find((option) => option.value === raw)?.label ??
      raw
    return [{ key, label }]
  })
}
