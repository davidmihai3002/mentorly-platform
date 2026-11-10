/**
 * Pornește mock-urile API în browser când VITE_USE_MOCKS=true (dezvoltare, staging fără
 * backend). Condiția e evaluată la build: fără mock-uri, codul MSW nu ajunge în aplicație.
 */
export async function enableMocking(): Promise<void> {
  if (import.meta.env.VITE_USE_MOCKS !== 'true') return

  const [{ network }, { handlers }] = await Promise.all([
    import('virtual:msw'),
    import('./handlers'),
  ])
  // Cererile neacoperite de mock (fonturi, fișierele Vite) trec mai departe, nemodificate.
  network.configure({ handlers, onUnhandledFrame: 'bypass' })
  await network.enable()
}
