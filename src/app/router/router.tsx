import { createBrowserRouter, redirect } from 'react-router'
import { ACCOUNT_PLACEHOLDER_TEXT, ROUTES } from '@/constants'
import { AuthLayout } from '../layouts/AuthLayout'
import { PublicLayout } from '../layouts/PublicLayout'
import { RootLayout } from '../layouts/RootLayout'
import { AccountPlaceholderPage } from '../pages/AccountPlaceholderPage'
import { RouteFallback } from '../pages/RouteFallback'

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    HydrateFallback: RouteFallback,
    children: [
      {
        Component: PublicLayout,
        children: [
          { index: true, loader: () => redirect(ROUTES.login), Component: RouteFallback },
          ...(import.meta.env.DEV
            ? [
                {
                  path: ROUTES.componentsPreview,
                  lazy: async () => ({
                    Component: (await import('../dev/ComponentsPreviewPage')).ComponentsPreviewPage,
                  }),
                },
              ]
            : []),
        ],
      },
      {
        Component: AuthLayout,
        children: [
          {
            path: ROUTES.login,
            lazy: async () => ({ Component: (await import('@/features/auth')).LoginPage }),
          },
          {
            path: ROUTES.signup,
            lazy: async () => ({ Component: (await import('@/features/auth')).SignupPage }),
          },
          {
            path: '*',
            lazy: async () => ({ Component: (await import('../pages/NotFoundPage')).NotFoundPage }),
          },
        ],
      },
      {
        lazy: async () => ({
          Component: (await import('../layouts/AccountLayout')).AccountLayout,
        }),
        children: [
          {
            path: ROUTES.student,
            element: <AccountPlaceholderPage {...ACCOUNT_PLACEHOLDER_TEXT.student} />,
          },
          {
            path: ROUTES.mentor,
            element: <AccountPlaceholderPage {...ACCOUNT_PLACEHOLDER_TEXT.mentor} />,
          },
        ],
      },
    ],
  },
])
