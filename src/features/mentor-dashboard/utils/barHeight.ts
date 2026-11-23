const PERCENT = 100

export function barHeight(amount: number, max: number): number {
  return max > 0 ? Math.round((amount / max) * PERCENT) : 0
}
