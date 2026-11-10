import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

// jsdom nu implementează câteva API-uri de browser. Le înlocuim cu variante minime, doar
// în teste: ResizeObserver (poziționarea meniurilor Radix) și scrollTo (ScrollRestoration).
// Alte componente Radix (Select, Popover) pot cere în viitor și scrollIntoView sau
// hasPointerCapture; se adaugă aici atunci, când un test le cere.
class ResizeObserverStub implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverStub
window.scrollTo = () => {}
