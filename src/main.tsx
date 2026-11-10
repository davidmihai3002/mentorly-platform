import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { AppProviders } from './app/providers'
import { routes } from './app/routes'
import { getEnv } from './lib/env'
import './index.css'

// O configurare greșită oprește aplicația imediat, cu un mesaj clar în consolă.
getEnv()

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Elementul #root lipsește din index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={createBrowserRouter(routes)} />
    </AppProviders>
  </StrictMode>,
)
