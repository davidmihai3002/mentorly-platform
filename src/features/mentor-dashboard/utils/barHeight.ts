const PERCENT = 100
const MAX_BAR_SHARE = 0.7

export function barHeight(amount: number, max: number): number {
  return max > 0 ? Math.round((amount / max) * PERCENT * MAX_BAR_SHARE) : 0
}
