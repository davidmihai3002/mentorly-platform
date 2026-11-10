import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  it('are titlul paginii, un singur h1 și conținutul principal în <main>', () => {
    render(<LoginPage />)
    expect(document.title).toBe('Autentificare – Mentorly')
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('main')).toContainElement(screen.getByRole('heading', { level: 1 }))
  })

  it('arată exemplul de mentor și oferta apelului gratuit, ca în moodboard', () => {
    render(<LoginPage />)
    const preview = screen.getByRole('figure')
    expect(preview).toHaveTextContent('Exemplu de profil')
    expect(preview).toHaveTextContent('Disponibil azi')
    expect(screen.getAllByText('Primul apel introductiv e gratuit').length).toBeGreaterThan(0)
  })
})
