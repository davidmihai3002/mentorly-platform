export function formatScore(score: number): string {
  return score.toLocaleString('ro-RO', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}
