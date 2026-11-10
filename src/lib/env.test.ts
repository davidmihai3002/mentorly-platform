import { afterEach, describe, expect, it, vi } from 'vitest'
import { getEnv } from './env'

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('getEnv', () => {
  it('citește URL-ul API-ului și scoate slash-ul final', () => {
    vi.stubEnv('VITE_API_URL', 'https://api.mentorly.ro/')
    expect(getEnv().apiUrl).toBe('https://api.mentorly.ro')
  })

  it('pornește fără mock-uri dacă VITE_USE_MOCKS lipsește', () => {
    vi.stubEnv('VITE_API_URL', 'http://localhost:3000')
    vi.stubEnv('VITE_USE_MOCKS', undefined)
    expect(getEnv().useMocks).toBe(false)
  })

  it('pornește mock-urile doar pentru valoarea exactă „true”', () => {
    vi.stubEnv('VITE_API_URL', 'http://localhost:3000')
    vi.stubEnv('VITE_USE_MOCKS', 'true')
    expect(getEnv().useMocks).toBe(true)
  })

  it.each([
    ['lipsă', undefined],
    ['un text oarecare', 'nu-e-url'],
    ['protocol periculos', 'javascript:alert(1)'],
  ])('refuză VITE_API_URL %s, cu mesaj clar', (_label, value) => {
    vi.stubEnv('VITE_API_URL', value)
    expect(() => getEnv()).toThrow(/Configurare invalidă/)
  })

  it('în producție cere https, cu excepția localhost', () => {
    vi.stubEnv('PROD', true)
    vi.stubEnv('VITE_API_URL', 'http://api.mentorly.ro')
    expect(() => getEnv()).toThrow(/https/)

    vi.stubEnv('VITE_API_URL', 'http://localhost:3000')
    expect(getEnv().apiUrl).toBe('http://localhost:3000')
  })

  it('refuză o valoare greșită pentru VITE_USE_MOCKS', () => {
    vi.stubEnv('VITE_API_URL', 'http://localhost:3000')
    vi.stubEnv('VITE_USE_MOCKS', 'da')
    expect(() => getEnv()).toThrow(/VITE_USE_MOCKS/)
  })
})
