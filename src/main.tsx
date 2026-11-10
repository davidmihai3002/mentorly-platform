import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { AppProviders } from './app/providers'
import { routes } from './app/routes'
import { getEnv } from './lib/env'
import { enableMocking } from './mocks/enable'
import './index.css'

// O configurare greșită oprește aplicația imediat, cu un mesaj clar în consolă.
const env = getEnv()
if (import.meta.env.PROD && env.useMocks) {
  console.warn('Mentorly: mock-urile API sunt ACTIVE în acest build (VITE_USE_MOCKS=true).')
}

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Elementul #root lipsește din index.html')
}

function render(container: HTMLElement) {
  createRoot(container).render(
    <StrictMode>
      <AppProviders>
        <RouterProvider router={createBrowserRouter(routes)} />
      </AppProviders>
    </StrictMode>,
  )
}

enableMocking()
  .catch((error: unknown) => {
    // Aplicația pornește oricum; cererile vor merge spre API-ul real.
    console.error('Mock-urile API nu au pornit:', error)
  })
  .finally(() => {
    render(rootElement)
  })
