import { act, type ComponentType } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, data, RouterProvider, type RouteObject } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest'
import { AuthLayout, MenteeLayout, MentorLayout, PublicLayout, RootLayout } from './layouts'
import { MAIN_CONTENT_ID, PATHS } from './paths'
import { routes } from './routes'
import { RouteErrorPage } from './status-pages'

function renderAt(path: string, routeTree: RouteObject[] = routes) {
  const router = createMemoryRouter(routeTree, { initialEntries: [path] })
  render(<RouterProvider router={router} />)
  return router
}

/**
 * Un layout cu o pagină-test în loc de pagina reală. Testele layout-urilor nu depind
 * astfel de conținutul paginilor, care se schimbă în tichetele următoare.
 */
function layoutTree(Layout: ComponentType, path: string): RouteObject[] {
  return [
    {
      element: <RootLayout />,
      children: [
        { element: <Layout />, children: [{ path, element: <h1>Pagină de test</h1> }] },
        { path: PATHS.login, element: <h1>Login</h1> },
      ],
    },
  ]
}

const LAYOUTS = [
  ['public', PublicLayout, PATHS.home],
  ['autentificare', AuthLayout, PATHS.login + '/test'],
  ['cursant', MenteeLayout, PATHS.menteeDashboard],
  ['mentor', MentorLayout, PATHS.mentorDashboard],
] as const

describe('layout public', () => {
  it('are în header butoanele din tichet, cu linkurile corecte', async () => {
    renderAt(PATHS.home, layoutTree(PublicLayout, PATHS.home))
    const header = await screen.findByRole('banner')
    const link = (name: string) => within(header).getByRole('link', { name })

    expect(link('Mentorly')).toHaveAttribute('href', PATHS.home)
    expect(link('Caută mentori')).toHaveAttribute('href', PATHS.mentors)
    expect(link('Înregistrează-te ca mentorat')).toHaveAttribute('href', PATHS.registerMentee)
    expect(link('Înregistrează-te ca mentor')).toHaveAttribute('href', PATHS.registerMentor)
    expect(link('Login')).toHaveAttribute('href', PATHS.login)
  })
})

describe('layout de autentificare', () => {
  it('are doar logo-ul, fără butoanele de înregistrare', async () => {
    renderAt('/x', layoutTree(AuthLayout, '/x'))
    const header = await screen.findByRole('banner')
    expect(within(header).getByRole('link', { name: 'Mentorly' })).toHaveAttribute(
      'href',
      PATHS.home,
    )
    expect(screen.queryByRole('link', { name: 'Înregistrează-te ca mentor' })).toBeNull()
  })
})

describe('layout-urile cursant și mentor', () => {
  it.each([
    [MenteeLayout, PATHS.menteeDashboard, 'Meniu cursant'],
    [MentorLayout, PATHS.mentorDashboard, 'Meniu mentor'],
  ])('%#: au navigația proprie', async (Layout, path, navName) => {
    renderAt(path, layoutTree(Layout, path))
    expect(await screen.findByRole('navigation', { name: navName })).toBeVisible()
  })

  it('„Deconectare” duce la login și înlocuiește panoul în istoric', async () => {
    const user = userEvent.setup()
    const router = renderAt(PATHS.menteeDashboard, layoutTree(MenteeLayout, PATHS.menteeDashboard))

    const trigger = await screen.findByRole('button', { name: 'Contul meu' })
    // Radix deschide meniul la pointerdown, pe care jsdom nu-l simulează fidel; Enter pe
    // butonul focalizat e calea stabilă în teste și e la fel de reală pentru utilizator.
    trigger.focus()
    await user.keyboard('{Enter}')
    await user.click(await screen.findByRole('menuitem', { name: 'Deconectare' }))

    expect(router.state.location.pathname).toBe(PATHS.login)
    expect(router.state.historyAction).toBe('REPLACE')
  })
})

describe('accesibilitate în toate layout-urile', () => {
  it.each(LAYOUTS)('%s: header, main și „Sari la conținut”', async (_name, Layout, path) => {
    renderAt(path, layoutTree(Layout, path))
    const main = await screen.findByRole('main')
    expect(main).toHaveAttribute('id', MAIN_CONTENT_ID)
    expect(main).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Sari la conținut' })).toHaveAttribute(
      'href',
      `#${MAIN_CONTENT_ID}`,
    )
  })
})

describe('rutele reale', () => {
  it.each(Object.values(PATHS))('%s duce la o pagină cu titlu', async (path) => {
    renderAt(path)
    expect(await screen.findByRole('heading', { level: 1 })).toBeVisible()
  })

  it('arată 404 cu header și link acasă pentru o adresă necunoscută', async () => {
    renderAt('/pagina-care-nu-exista')
    expect(await screen.findByRole('heading', { name: 'Pagina nu a fost găsită' })).toBeVisible()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Înapoi la pagina principală' })).toHaveAttribute(
      'href',
      PATHS.home,
    )
  })

  it('arată „Se încarcă…” până sosește o pagină deschisă direct', async () => {
    renderAt(PATHS.mentors)
    expect(screen.getByRole('status')).toHaveTextContent('Se încarcă…')
    expect(await screen.findByRole('heading', { level: 1 })).toBeVisible()
  })

  it('arată bara de progres cât se încarcă pagina următoare', async () => {
    let finishLoading: () => void = () => {}
    const slowPage = new Promise<void>((resolve) => {
      finishLoading = resolve
    })
    const router = renderAt('/', [
      {
        element: <RootLayout />,
        children: [
          { path: '/', element: <p>Acasă</p> },
          {
            path: '/lent',
            lazy: () => slowPage.then(() => ({ Component: () => <h1>Pagina lentă</h1> })),
          },
        ],
      },
    ])
    await screen.findByText('Acasă')

    act(() => {
      void router.navigate('/lent')
    })
    expect(await screen.findByRole('progressbar', { name: 'Se încarcă pagina' })).toBeVisible()

    await act(async () => {
      finishLoading()
      await slowPage
    })
    expect(await screen.findByRole('heading', { name: 'Pagina lentă' })).toBeVisible()
    expect(screen.queryByRole('progressbar')).toBeNull()
  })
})

describe('pagina de eroare a rutelor', () => {
  let consoleError: MockInstance<typeof console.error>

  beforeEach(() => {
    consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleError.mockRestore()
  })

  const failingTree = (route: RouteObject): RouteObject[] => [
    { element: <RootLayout />, errorElement: <RouteErrorPage />, children: [route] },
  ]

  it('arată un mesaj prietenos, fără detalii tehnice, dar le păstrează în consolă', async () => {
    renderAt('/', failingTree({ path: '/', lazy: () => Promise.reject(new Error('intern')) }))
    expect(await screen.findByRole('heading', { name: 'Ceva n-a mers bine' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Reîncarcă pagina' })).toBeVisible()
    expect(screen.queryByText(/intern/)).toBeNull()
    expect(consoleError).toHaveBeenCalledWith(expect.objectContaining({ message: 'intern' }))
  })

  it('explică o versiune nouă a aplicației când un fișier nu mai există după deploy', async () => {
    const stale = new TypeError('Failed to fetch dynamically imported module: /assets/x-1.js')
    renderAt('/', failingTree({ path: '/', lazy: () => Promise.reject(stale) }))
    expect(await screen.findByText(/A apărut o versiune nouă a aplicației/)).toBeVisible()
  })

  it('arată „Pagina nu a fost găsită” când o rută răspunde cu 404', async () => {
    renderAt(
      '/',
      failingTree({
        path: '/',
        loader: () => {
          throw data(null, { status: 404 })
        },
        element: <p>nu ajunge aici</p>,
      }),
    )
    expect(await screen.findByRole('heading', { name: 'Pagina nu a fost găsită' })).toBeVisible()
  })
})
