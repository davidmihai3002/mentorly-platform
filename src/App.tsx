import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/**
 * Pagină de test pentru SCRUM-273: verifică vizual că Tailwind și shadcn/ui funcționează.
 * Se înlocuiește cu router-ul și layout-urile din SCRUM-275.
 */
function App() {
  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col justify-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Mentorly — test Tailwind + shadcn/ui</h1>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="nume@exemplu.ro" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email-invalid">Email (cu eroare)</Label>
        <Input
          id="email-invalid"
          type="email"
          defaultValue="nu-e-email"
          aria-invalid
          aria-describedby="email-invalid-error"
        />
        {/* Eroarea se spune în text, nu doar prin culoare (WCAG 1.4.1 și 3.3.1). */}
        <p id="email-invalid-error" className="text-sm text-destructive">
          Adresa de email nu este validă.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button>Rezervă apel introductiv</Button>
        <Button variant="secondary">Secundar</Button>
        <Button variant="outline">Contur</Button>
        <Button variant="ghost">Discret</Button>
        <Button variant="destructive">Șterge</Button>
        <Button disabled>Dezactivat</Button>
      </div>
    </main>
  )
}

export default App
