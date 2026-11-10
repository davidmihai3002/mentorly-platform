import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest'
import { LoginForm } from './LoginForm'

let consoleLog: MockInstance<typeof console.log>

beforeEach(() => {
  consoleLog = vi.spyOn(console, 'log').mockImplementation(() => {})
})
afterEach(() => {
  consoleLog.mockRestore()
})

const email = () => screen.getByRole('textbox', { name: 'Email' })
const password = () => screen.getByLabelText('Parolă')

const loggedText = () => JSON.stringify(consoleLog.mock.calls)

describe('LoginForm', () => {
  it('la trimitere goală: erori pe câmpuri, focus pe primul, nimic în consolă', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.click(screen.getByRole('button', { name: 'Intră în cont' }))

    expect(email()).toHaveAttribute('aria-invalid', 'true')
    expect(email()).toHaveAccessibleDescription('Introdu adresa de email.')
    expect(password()).toHaveAttribute('aria-invalid', 'true')
    expect(password()).toHaveAccessibleDescription('Introdu parola.')
    expect(email()).toHaveFocus()
    expect(consoleLog).not.toHaveBeenCalled()
  })

  it('trimis cu Enter, anunță rezumatul erorilor pentru cititoarele de ecran', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    await user.type(email(), 'nu-e-email{Enter}')

    expect(screen.getByRole('status')).toHaveTextContent(
      'Formularul are 2 erori: Adresa de email nu este validă. Introdu parola.',
    )
  })

  it('cu date valide loghează emailul și parola MASCATĂ', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)
    await user.type(email(), '  ana@mentorly.ro ')
    await user.type(password(), 'parola-secreta')
    await user.click(screen.getByRole('button', { name: 'Intră în cont' }))

    expect(consoleLog).toHaveBeenCalledWith('[Mentorly] login', {
      action: 'login',
      email: 'ana@mentorly.ro',
      password: '•••••••••••••• (14 caractere)',
    })
    expect(loggedText()).not.toContain('parola-secreta')
    expect(screen.getByRole('status')).toHaveTextContent('')
  })

  it.each([
    ['Continuă cu Google', 'google'],
    ['Ai uitat parola?', 'forgot-password'],
    ['Caut un mentor', 'register-mentee'],
    ['Vreau să devin mentor', 'register-mentor'],
  ])('„%s” loghează ce s-a completat până acum, fără validare', async (button, action) => {
    const user = userEvent.setup()
    render(<LoginForm />)
    await user.type(email(), 'ana@mentorly.ro')
    await user.type(password(), 'abc')
    await user.click(screen.getByRole('button', { name: button }))

    expect(consoleLog).toHaveBeenCalledWith(`[Mentorly] ${action}`, {
      action,
      email: 'ana@mentorly.ro',
      password: '••• (3 caractere)',
    })
    expect(loggedText()).not.toContain('"abc"')
    expect(email()).not.toHaveAttribute('aria-invalid', 'true')
  })
})
