import { describe, expect, it } from 'vitest'
import { buildLoginLog } from './buildLoginLog'

describe('buildLoginLog', () => {
  it('include acțiunea, emailul curățat de spații și parola mascată', () => {
    expect(buildLoginLog('login', { email: '  ana@mentorly.ro ', password: 'parola1' })).toEqual({
      action: 'login',
      email: 'ana@mentorly.ro',
      password: '••••••• (7 caractere)',
    })
  })

  it('parola în clar nu apare nicăieri în log', () => {
    const log = buildLoginLog('google', { email: 'ana@mentorly.ro', password: 'SuperSecret!' })
    expect(JSON.stringify(log)).not.toContain('SuperSecret!')
  })

  it('funcționează și cu un formular încă necompletat', () => {
    expect(buildLoginLog('register-mentor', { email: '', password: '' })).toEqual({
      action: 'register-mentor',
      email: '',
      password: '(necompletată)',
    })
  })
})
