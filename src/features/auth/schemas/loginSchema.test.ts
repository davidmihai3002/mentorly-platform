import { describe, expect, it } from 'vitest'
import { loginSchema } from './loginSchema'

const messageFor = (email: string, password = 'x') =>
  loginSchema.safeParse({ email, password }).error?.issues[0]?.message

describe('loginSchema', () => {
  it.each([
    ['', 'Introdu adresa de email.'],
    ['   ', 'Introdu adresa de email.'],
    ['nu-e-email', 'Adresa de email nu este validă.'],
  ])('email „%s” → %s', (email, message) => {
    expect(messageFor(email)).toBe(message)
  })

  it('curăță spațiile din jurul emailului', () => {
    expect(loginSchema.parse({ email: '  ana@mentorly.ro ', password: 'x' }).email).toBe(
      'ana@mentorly.ro',
    )
  })

  it('parola goală e refuzată, dar spațiile din parolă se păstrează', () => {
    expect(loginSchema.safeParse({ email: 'a@b.ro', password: '' }).success).toBe(false)
    expect(loginSchema.parse({ email: 'a@b.ro', password: ' p ' }).password).toBe(' p ')
  })
})
