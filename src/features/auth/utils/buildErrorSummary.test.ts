import { describe, expect, it } from 'vitest'
import { buildErrorSummary } from './buildErrorSummary'

describe('buildErrorSummary', () => {
  it('numără erorile și le enumeră', () => {
    expect(buildErrorSummary(['Introdu adresa de email.', 'Introdu parola.'])).toBe(
      'Formularul are 2 erori: Introdu adresa de email. Introdu parola.',
    )
  })

  it('folosește singularul pentru o singură eroare', () => {
    expect(buildErrorSummary(['Introdu parola.'])).toBe('Formularul are o eroare: Introdu parola.')
  })

  it('fără erori nu anunță nimic', () => {
    expect(buildErrorSummary([])).toBe('')
  })
})
