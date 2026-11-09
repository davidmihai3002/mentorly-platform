import { describe, expect, it } from 'vitest'
import {
  formatDate,
  formatDateTime,
  formatSessionSlot,
  formatTime,
  formatTimeRange,
  formatWeeklySlot,
} from './date'
import type { WeeklySlot } from './date'

const EN_DASH = '–'

// 9 noiembrie 2026, 17:00 UTC = 19:00 la București (iarna, UTC+2)
const WINTER = '2026-11-09T17:00:00Z'
const WINTER_END = '2026-11-09T18:00:00Z'
// 15 iulie 2026, 15:00 UTC = 18:00 la București (vara, UTC+3)
const SUMMER = '2026-07-15T15:00:00Z'

describe('mediul de test', () => {
  it('rulează pe UTC, ca rezultatele să nu depindă de calculator', () => {
    expect(new Intl.DateTimeFormat().resolvedOptions().timeZone).toBe('UTC')
  })
})

describe('formatDate', () => {
  it('folosește implicit formatul lung, în română', () => {
    expect(formatDate(WINTER)).toBe('9 noiembrie 2026')
  })

  it('acceptă stilurile short, medium și full', () => {
    expect(formatDate(WINTER, 'short')).toBe('09.11.2026')
    expect(formatDate(WINTER, 'medium')).toBe('9 nov. 2026')
    expect(formatDate(WINTER, 'full')).toBe('luni, 9 noiembrie 2026')
  })

  it('folosește ziua din București, nu din UTC (22:30 UTC = a doua zi)', () => {
    expect(formatDate('2026-11-09T22:30:00Z')).toBe('10 noiembrie 2026')
  })

  it('acceptă și obiecte Date', () => {
    expect(formatDate(new Date(WINTER))).toBe('9 noiembrie 2026')
  })
})

describe('formatTime', () => {
  it('afișează ora din București iarna (UTC+2)', () => {
    expect(formatTime(WINTER)).toBe('19:00')
  })

  it('afișează ora din București vara (UTC+3)', () => {
    expect(formatTime(SUMMER)).toBe('18:00')
  })

  it('trece corect peste schimbarea la ora de vară (29 martie 2026)', () => {
    expect(formatTime('2026-03-29T00:30:00Z')).toBe('02:30')
    expect(formatTime('2026-03-29T01:30:00Z')).toBe('04:30')
  })
})

describe('formatDateTime', () => {
  it('afișează data, ora și fusul orar explicit', () => {
    expect(formatDateTime(WINTER)).toBe('9 noiembrie 2026, 19:00 (ora României)')
  })
})

describe('formatTimeRange', () => {
  it('afișează intervalul și fusul orar', () => {
    expect(formatTimeRange(WINTER, WINTER_END)).toBe(`19:00${EN_DASH}20:00 (ora României)`)
  })

  it('refuză un interval care se termină înainte să înceapă', () => {
    expect(() => formatTimeRange(WINTER_END, WINTER)).toThrow(RangeError)
  })

  it('refuză un interval de durată zero', () => {
    expect(() => formatTimeRange(WINTER, WINTER)).toThrow(RangeError)
  })
})

describe('formatSessionSlot', () => {
  it('afișează ziua, data, intervalul și fusul orar', () => {
    expect(formatSessionSlot(WINTER, WINTER_END)).toBe(
      `luni, 9 noiembrie 2026, 19:00${EN_DASH}20:00 (ora României)`,
    )
  })

  it('afișează ambele date când ședința trece de miezul nopții', () => {
    expect(formatSessionSlot('2026-11-09T21:30:00Z', '2026-11-09T22:30:00Z')).toBe(
      `luni, 9 noiembrie 2026, 23:30 ${EN_DASH} marți, 10 noiembrie 2026, 00:30 (ora României)`,
    )
  })
})

describe('formatWeeklySlot', () => {
  it('afișează un interval săptămânal recurent (ISO: 1 = luni)', () => {
    expect(formatWeeklySlot({ dayOfWeek: 1, startTime: '18:00', endTime: '20:00' })).toBe(
      `Luni, 18:00${EN_DASH}20:00 (ora României)`,
    )
  })

  it('afișează duminica (7) cu diacritice corecte pentru sâmbătă (6)', () => {
    expect(formatWeeklySlot({ dayOfWeek: 7, startTime: '10:00', endTime: '12:30' })).toBe(
      `Duminică, 10:00${EN_DASH}12:30 (ora României)`,
    )
    expect(formatWeeklySlot({ dayOfWeek: 6, startTime: '09:00', endTime: '10:00' })).toBe(
      `Sâmbătă, 09:00${EN_DASH}10:00 (ora României)`,
    )
  })

  it.each([0, 8, 1.5, Number.NaN])('refuză ziua %s', (dayOfWeek) => {
    expect(() => formatWeeklySlot({ dayOfWeek, startTime: '18:00', endTime: '20:00' })).toThrow(
      RangeError,
    )
  })

  it.each(['24:00', '9:00', '18:60', '18-00', '', ' 18:00'])('refuză ora „%s”', (startTime) => {
    expect(() => formatWeeklySlot({ dayOfWeek: 1, startTime, endTime: '20:00' })).toThrow(
      RangeError,
    )
  })

  it('refuză un interval în care ora de sfârșit nu e după cea de început', () => {
    expect(() => formatWeeklySlot({ dayOfWeek: 1, startTime: '20:00', endTime: '18:00' })).toThrow(
      RangeError,
    )
    expect(() => formatWeeklySlot({ dayOfWeek: 1, startTime: '18:00', endTime: '18:00' })).toThrow(
      RangeError,
    )
  })
})

describe('validarea datelor de intrare (date nesigure de la API)', () => {
  it.each([
    ['un text care nu e dată', 'nu-i dată'],
    ['un șir gol', ''],
    ['o dată fără fus orar (ambiguă)', '2026-11-09T17:00:00'],
    ['doar data, fără oră', '2026-11-09'],
    ['o dată imposibilă', '2026-02-30T10:00:00Z'],
  ])('refuză %s', (_label, value) => {
    expect(() => formatDate(value)).toThrow(RangeError)
  })

  it('refuză un obiect Date invalid', () => {
    expect(() => formatTime(new Date('invalid'))).toThrow(RangeError)
  })

  it('refuză tipuri greșite', () => {
    expect(() => formatDate(1762707600000 as unknown as string)).toThrow(RangeError)
    expect(() => formatDate(null as unknown as string)).toThrow(RangeError)
  })

  it('acceptă un offset explicit în locul lui Z', () => {
    expect(formatTime('2026-11-09T19:00:00+02:00')).toBe('19:00')
  })

  it.each([
    ['milisecunde', '2026-11-09T17:00:00.123Z'],
    ['microsecunde (Python)', '2026-11-09T17:00:00.123456Z'],
    ['7 cifre (.NET)', '2026-11-09T17:00:00.1234567Z'],
    ['fără secunde', '2026-11-09T17:00Z'],
  ])('acceptă fracțiuni de secundă: %s', (_label, value) => {
    expect(formatTime(value)).toBe('19:00')
  })

  it('validează corect anii mici (fără mutarea în 1900–1999)', () => {
    expect(() => formatDate('0099-02-29T00:00:00Z')).toThrow(RangeError)
    expect(() => formatDate('2000-02-29T00:00:00Z')).not.toThrow()
  })

  it('refuză un interval săptămânal lipsă sau cu tipuri greșite', () => {
    expect(() => formatWeeklySlot(null as unknown as WeeklySlot)).toThrow(RangeError)
    expect(() =>
      formatWeeklySlot({ dayOfWeek: 1, startTime: 1800 as unknown as string, endTime: '20:00' }),
    ).toThrow(RangeError)
  })
})

describe('trecerea la ora de iarnă (25 octombrie 2026)', () => {
  it('fixează comportamentul documentat: intervalul pare inversat', () => {
    // 00:30 UTC = 03:30 ora de vară; 01:10 UTC = 03:10 ora de iarnă
    expect(formatTimeRange('2026-10-25T00:30:00Z', '2026-10-25T01:10:00Z')).toBe(
      `03:30${EN_DASH}03:10 (ora României)`,
    )
  })
})
