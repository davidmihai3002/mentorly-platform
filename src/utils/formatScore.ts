import { LOCALE } from '@/constants'
export function formatScore(score: number): string {
  return score.toLocaleString(LOCALE, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}
