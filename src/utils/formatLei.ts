const LEI_FORMAT = new Intl.NumberFormat('ro-RO')

export function formatLei(amount: number): string {
  return `${LEI_FORMAT.format(amount)} lei`
}
