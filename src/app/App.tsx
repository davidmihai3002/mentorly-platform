import { RouterProvider } from 'react-router'
import { SessionProvider } from '@/session'
import { router } from './router'

export function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  )
}
