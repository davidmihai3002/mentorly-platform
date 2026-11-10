import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { routes } from './app/routes'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Elementul #root lipsește din index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(routes)} />
  </StrictMode>,
)
