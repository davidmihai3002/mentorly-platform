import { APP_LOCALE, BANI_PER_LEU, CURRENCY_LABEL } from './constants'

// Scris ca escape, nu ca simbol invizibil, ca un editor să nu-l transforme în spațiu obișnuit.
const NBSP = '\u00A0'

const WHOLE_LEI = new Intl.NumberFormat(APP_LOCALE, { maximumFractionDigits: 0 })

const DECIMAL_SEPARATOR =
  new Intl.NumberFormat(APP_LOCALE).formatToParts(1.5).find((part) => part.type === 'decimal')
    ?.value ?? ','

/**
 * Formatează o sumă primită **în bani** (număr întreg) ca preț afișabil.
 *
 * - `15000` → `"150 lei"` (fără zecimale inutile)
 * - `14950` → `"149,50 lei"`
 * - `123456700` → `"1.234.567 lei"`
 *
 * Între sumă și „lei” e un spațiu neseparabil, ca prețul să nu se rupă pe două rânduri.
 * Calculul se face doar cu numere întregi, deci e exact pentru orice sumă acceptată.
 *
 * @throws {RangeError} dacă suma nu este un număr întreg sigur. Asta prinde și cazul
 *   în care API-ul trimite suma în lei (de ex. `150.5`) în loc de bani.
 */
export function formatRon(amountInBani: number): string {
  if (!Number.isSafeInteger(amountInBani)) {
    throw new RangeError(
      `formatRon: suma trebuie să fie un număr întreg de bani, am primit ${String(amountInBani)}`,
    )
  }

  const sign = amountInBani < 0 ? '-' : ''
  const absolute = Math.abs(amountInBani)
  const bani = absolute % BANI_PER_LEU
  // Scăderea restului face împărțirea exactă, fără erori de virgulă mobilă.
  const lei = (absolute - bani) / BANI_PER_LEU

  const wholePart = WHOLE_LEI.format(lei)
  const fraction = bani === 0 ? '' : `${DECIMAL_SEPARATOR}${String(bani).padStart(2, '0')}`

  return `${sign}${wholePart}${fraction}${NBSP}${CURRENCY_LABEL}`
}
