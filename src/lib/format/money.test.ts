import { describe, expect, it } from 'vitest'
import { formatRon } from './money'

// Intl folosește spațiu neseparabil (U+00A0) între mii și între sumă și monedă,
// ca prețul să nu se rupă pe două rânduri.
const NBSP = '\u00A0'

describe('formatRon', () => {
  it('afișează sumele întregi fără zecimale', () => {
    expect(formatRon(15000)).toBe(`150${NBSP}lei`)
  })

  it('afișează două zecimale când suma are bani', () => {
    expect(formatRon(14950)).toBe(`149,50${NBSP}lei`)
    expect(formatRon(14905)).toBe(`149,05${NBSP}lei`)
  })

  it('folosește punctul ca separator de mii', () => {
    expect(formatRon(123456700)).toBe(`1.234.567${NBSP}lei`)
  })

  it('afișează zero', () => {
    expect(formatRon(0)).toBe(`0${NBSP}lei`)
  })

  it('afișează sume negative (rambursări)', () => {
    expect(formatRon(-5000)).toBe(`-50${NBSP}lei`)
  })

  it('nu afișează niciodată „-0”', () => {
    expect(formatRon(-0)).toBe(`0${NBSP}lei`)
  })

  it('afișează un singur ban corect', () => {
    expect(formatRon(1)).toBe(`0,01${NBSP}lei`)
  })

  it('afișează bani negativi sub un leu', () => {
    expect(formatRon(-50)).toBe(`-0,50${NBSP}lei`)
  })

  it('este exact și pentru sume foarte mari (fără erori de virgulă mobilă)', () => {
    expect(formatRon(Number.MAX_SAFE_INTEGER)).toBe(`90.071.992.547.409,91${NBSP}lei`)
  })

  it.each([
    ['zecimale (sumă trimisă în lei, nu în bani)', 150.5],
    ['NaN', Number.NaN],
    ['Infinity', Number.POSITIVE_INFINITY],
    ['peste Number.MAX_SAFE_INTEGER', Number.MAX_SAFE_INTEGER + 2],
  ])('refuză %s', (_label, value) => {
    expect(() => formatRon(value)).toThrow(RangeError)
  })

  it('refuză valori care nu sunt numere (date nesigure de la API)', () => {
    expect(() => formatRon('15000' as unknown as number)).toThrow(RangeError)
    expect(() => formatRon(null as unknown as number)).toThrow(RangeError)
  })
})
