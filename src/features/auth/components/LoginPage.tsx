import { LOGIN_TEXT } from '../constants'
import { LoginBrandPanel } from './LoginBrandPanel'
import { LoginForm } from './LoginForm'

/** Pagina de login: panou de brand (ecrane mari) + cardul cu formularul. */
export function LoginPage() {
  return (
    <div className="grid min-h-svh grid-cols-[minmax(0,1fr)] bg-background lg:grid-cols-2">
      <title>{LOGIN_TEXT.pageTitle}</title>
      <LoginBrandPanel />
      <main className="flex min-w-0 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8 rounded-3xl bg-card p-6 shadow-lg sm:p-10">
          <header className="space-y-3">
            <p className="font-heading text-xl font-extrabold tracking-tight text-primary lg:hidden">
              {LOGIN_TEXT.brand}
            </p>
            <h1 className="font-heading text-3xl font-extrabold">{LOGIN_TEXT.title}</h1>
            <p className="text-muted-foreground">{LOGIN_TEXT.subtitle}</p>
            <p className="inline-flex items-center gap-2 rounded-full bg-success px-3 py-1 text-sm font-medium text-success-foreground lg:hidden">
              <span aria-hidden className="size-2 rounded-full bg-chart-3" />
              {LOGIN_TEXT.freeCall}
            </p>
          </header>
          <LoginForm />
        </div>
      </main>
    </div>
  )
}
