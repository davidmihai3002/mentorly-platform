import { Outlet, ScrollRestoration } from 'react-router'
import { SkipLink } from '@/components'
import { useFocusMainOnNavigate } from '../hooks'

export function RootLayout() {
  useFocusMainOnNavigate()

  return (
    <>
      <SkipLink />
      <ScrollRestoration />
      <Outlet />
    </>
  )
}
