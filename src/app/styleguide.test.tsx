import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider, type RouteObject } from 'react-router'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { STYLEGUIDE_PATH } from './paths'
import { AppProviders } from './providers'

async function renderStyleguide(routes: RouteObject[]) {
  const router = createMemoryRouter(routes, { initialEntries: [STYLEGUIDE_PATH] })
  render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>,
  )
  return screen.findByRole('heading', { level: 1 })
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe('styleguide (doar în dezvoltare)', () => {
  it('arată toate secțiunile și componentele de bază', async () => {
    const { routes } = await import('./routes')
    expect(await renderStyleguide(routes)).toHaveTextContent('Găsește mentorul potrivit')

    for (const section of [
      'Culori',
      'Tipografie, colțuri, umbre',
      'Butoane',
      'Formulare',
      'Card, badge-uri, avatar',
    ]) {
      expect(screen.getByRole('heading', { level: 2, name: section })).toBeVisible()
    }
    expect(screen.getByRole('button', { name: 'Rezervă apel introductiv' })).toBeVisible()
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeVisible()
    expect(screen.getByRole('checkbox', { name: 'Accept termenii' })).toBeVisible()
    expect(screen.getByRole('switch', { name: 'Notificări pe email' })).toBeVisible()
    expect(screen.getByRole('radiogroup', { name: 'Tip cont' })).toBeVisible()
    expect(screen.getByRole('tablist')).toBeVisible()
    expect(screen.getByText('Disponibil azi')).toBeVisible()
    expect(screen.getByRole('textbox', { name: 'Email (cu eroare)' })).toHaveAccessibleDescription(
      'Adresa de email nu este validă.',
    )
    expect(screen.getByRole('textbox', { name: 'Câmp dezactivat' })).toBeDisabled()
  })

  it('o notificare (toast) apare la cerere', async () => {
    const user = userEvent.setup()
    const { routes } = await import('./routes')
    await renderStyleguide(routes)

    await user.click(screen.getByRole('button', { name: 'Arată o notificare' }))
    expect(await screen.findByText('Aplicarea a fost trimisă.')).toBeVisible()
  })

  it('lipsește din build-ul de producție (adresa dă 404)', async () => {
    vi.stubEnv('DEV', false)
    vi.resetModules()
    const { routes } = await import('./routes')
    expect(await renderStyleguide(routes)).toHaveTextContent('Pagina nu a fost găsită')
  })
})
