import { describe, expect, it } from 'vitest'
import { isStaleChunkError } from './errors'

describe('isStaleChunkError', () => {
  it.each([
    ['Chrome', 'Failed to fetch dynamically imported module: https://x.ro/assets/a-1.js'],
    ['Safari', 'Importing a module script failed.'],
    ['Firefox', 'error loading dynamically imported module: https://x.ro/assets/a-1.js'],
  ])('recunoaște mesajul din %s', (_browser, message) => {
    expect(isStaleChunkError(new TypeError(message))).toBe(true)
  })

  it.each([
    ['o eroare obișnuită', new Error('Cannot read properties of undefined')],
    ['un text, nu o eroare', 'Failed to fetch dynamically imported module'],
    ['null', null],
  ])('nu confundă %s', (_label, value) => {
    expect(isStaleChunkError(value)).toBe(false)
  })
})
