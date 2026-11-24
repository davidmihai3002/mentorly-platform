import { LOCALE } from '@/constants'
const LEI_FORMAT = new Intl.NumberFormat(LOCALE)

export function formatLei(amount: number): string {
  return `${LEI_FORMAT.format(amount)} lei`
}
