import { describe, expect, it } from 'vitest'
import { maskPassword } from './maskPassword'

describe('maskPassword', () => {
  it('nu arată niciodată caracterele parolei, doar câte sunt', () => {
    expect(maskPassword('secret12')).toBe('•••••••• (8 caractere)')
  })

  it.each([
    ['a', '• (1 caracter)'],
    ['ab', '•• (2 caractere)'],
    ['x'.repeat(19), `${'•'.repeat(19)} (19 caractere)`],
    ['x'.repeat(20), `${'•'.repeat(20)} (20 de caractere)`],
  ])('folosește pluralul corect în română: „%s”', (password, expected) => {
    expect(maskPassword(password)).toBe(expected)
  })

  it('o parolă goală apare ca necompletată', () => {
    expect(maskPassword('')).toBe('(necompletată)')
  })

  it('o parolă foarte lungă nu umple consola: maxim 20 de puncte', () => {
    expect(maskPassword('x'.repeat(64))).toBe(`${'•'.repeat(20)} (64 de caractere)`)
  })
})
