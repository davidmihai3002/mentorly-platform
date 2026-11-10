import type { RouteObject } from 'react-router'
import { AuthLayout, MenteeLayout, MentorLayout, PublicLayout, RootLayout } from './layouts'
import { PATHS, STYLEGUIDE_PATH } from './paths'
import { NotFoundPage, PageLoading, RouteErrorPage } from './status-pages'

type PageName = keyof typeof import('./pages')

/**
 * Doar pentru paginile temporare din pages.tsx. ATENȚIE: pages.tsx NU devine colector
 * (fără `export { X } from '@/features/...'`), altfel toate paginile ajung într-un singur
 * fișier JS. O pagină reală se leagă direct din feature-ul ei:
 *   lazy: () => import('@/features/auth/LoginPage').then((m) => ({ Component: m.LoginPage }))
 * Când pages.tsx se golește, `lazyPage` se șterge.
 */
const lazyPage =
  (name: PageName): RouteObject['lazy'] =>
  () =>
    import('./pages').then((pages) => ({ Component: pages[name] }))

const styleguideRoute: RouteObject = {
  path: STYLEGUIDE_PATH,
  lazy: () => import('./styleguide').then((m) => ({ Component: m.StyleguidePage })),
}

/** Toate rutele aplicației. Layout-urile, 404 și paginile de stare se încarcă imediat. */
export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    // Ecranul de la prima încărcare, când adresa deschisă e o pagină încărcată la cerere.
    hydrateFallbackElement: <PageLoading />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { path: PATHS.home, lazy: lazyPage('HomePage') },
          { path: PATHS.mentors, lazy: lazyPage('MentorSearchPage') },
          // În build-ul de producție, condiția e false și codul paginii dispare complet.
          ...(import.meta.env.DEV ? [styleguideRoute] : []),
          { path: '*', element: <NotFoundPage /> },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: PATHS.login, lazy: lazyPage('LoginPage') },
          { path: PATHS.registerMentee, lazy: lazyPage('RegisterMenteePage') },
          { path: PATHS.registerMentor, lazy: lazyPage('RegisterMentorPage') },
        ],
      },
      {
        element: <MenteeLayout />,
        children: [{ path: PATHS.menteeDashboard, lazy: lazyPage('MenteeDashboardPage') }],
      },
      {
        element: <MentorLayout />,
        children: [{ path: PATHS.mentorDashboard, lazy: lazyPage('MentorDashboardPage') }],
      },
    ],
  },
]
