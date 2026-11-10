import { useEffect } from 'react'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { Button } from '@/components/ui/button'
import { isStaleChunkError } from '@/lib/errors'
import { PATHS } from './paths'

/** Prima încărcare a unei pagini încărcate la cerere (de ex. un link primit către /mentori). */
export function PageLoading() {
  return (
    <div role="status" className="flex min-h-svh items-center justify-center text-muted-foreground">
      Se încarcă…
    </div>
  )
}

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-md space-y-4 py-16 text-center">
      <p className="text-sm font-semibold text-primary">404</p>
      <h1 className="font-heading text-3xl font-bold">Pagina nu a fost găsită</h1>
      <p className="text-muted-foreground">Adresa poate fi greșită sau pagina a fost mutată.</p>
      <Button asChild>
        <Link to={PATHS.home}>Înapoi la pagina principală</Link>
      </Button>
    </section>
  )
}

/** Afișată când o rută aruncă o eroare (inclusiv la încărcarea ei la cerere). */
export function RouteErrorPage() {
  const error = useRouteError()

  useEffect(() => {
    // Până la monitorizarea erorilor (SCRUM-287), eroarea rămâne măcar în consolă.
    console.error(error)
  }, [error])

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className="px-4">
        <NotFoundPage />
      </main>
    )
  }

  const message = isStaleChunkError(error)
    ? 'A apărut o versiune nouă a aplicației. Reîncarcă pagina ca să continui.'
    : 'A apărut o eroare neașteptată. Încearcă să reîncarci pagina.'

  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-heading text-3xl font-bold">Ceva n-a mers bine</h1>
      <p className="text-muted-foreground">{message}</p>
      <Button onClick={() => window.location.reload()}>Reîncarcă pagina</Button>
    </main>
  )
}
