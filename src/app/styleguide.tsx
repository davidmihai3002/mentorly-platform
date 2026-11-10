import { StarIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { toast } from 'sonner'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const COLORS = [
  'background',
  'foreground',
  'primary',
  'highlight',
  'success',
  'success-foreground',
  'destructive',
  'rating',
  'muted',
  'muted-foreground',
  'border',
  'input',
] as const

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </section>
  )
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="grid w-64 gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  )
}

/** Toate componentele de bază cu tema Mentorly. Doar în dezvoltare (SCRUM-274). */
export function StyleguidePage() {
  return (
    <TooltipProvider>
      <div className="space-y-10">
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold">Găsește mentorul potrivit</h1>
          <p className="text-muted-foreground">
            Styleguide Mentorly: titluri în Plus Jakarta Sans, text în Inter. Doar în dezvoltare.
          </p>
        </header>

        <Section title="Culori">
          {COLORS.map((name) => (
            <div key={name} className="w-28 space-y-1 text-xs">
              <div
                className="h-12 rounded-lg border"
                style={{ backgroundColor: `var(--${name})` }}
              />
              <p>--{name}</p>
            </div>
          ))}
        </Section>

        <Section title="Tipografie, colțuri, umbre">
          <div className="w-80 space-y-2">
            {/* Mostre vizuale, nu titluri reale: pagina are un singur h1 (accesibilitate). */}
            <p className="font-heading text-4xl font-extrabold">Titlu H1</p>
            <p className="font-heading text-2xl font-bold">Titlu H2</p>
            <p className="font-heading text-lg font-semibold">Titlu H3</p>
            <p>Text de paragraf: lizibil, cald, uman.</p>
            <p className="text-sm text-muted-foreground">Text secundar, pentru detalii.</p>
          </div>
          {(['rounded-sm', 'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl'] as const).map(
            (radius) => (
              <div
                key={radius}
                className={`grid size-20 place-items-center bg-muted text-xs ${radius}`}
              >
                {radius}
              </div>
            ),
          )}
          {(['shadow-xs', 'shadow-sm', 'shadow-md', 'shadow-lg'] as const).map((shadow) => (
            <div
              key={shadow}
              className={`grid size-20 place-items-center rounded-xl bg-card text-xs ${shadow}`}
            >
              {shadow}
            </div>
          ))}
        </Section>

        <Section title="Butoane">
          <Button>Rezervă apel introductiv</Button>
          <Button variant="secondary">Secundar</Button>
          <Button variant="outline">Contur</Button>
          <Button variant="ghost">Discret</Button>
          <Button variant="destructive">Șterge</Button>
          <Button disabled>Dezactivat</Button>
        </Section>

        <Section title="Formulare">
          <Field id="sg-email" label="Email">
            <Input id="sg-email" type="email" placeholder="nume@exemplu.ro" />
          </Field>
          <Field id="sg-invalid" label="Email (cu eroare)">
            <Input
              id="sg-invalid"
              type="email"
              defaultValue="nu-e-email"
              aria-invalid
              aria-describedby="sg-invalid-error"
            />
            <p id="sg-invalid-error" className="text-sm text-destructive">
              Adresa de email nu este validă.
            </p>
          </Field>
          <Field id="sg-disabled" label="Câmp dezactivat">
            <Input id="sg-disabled" disabled defaultValue="Nu se poate modifica" />
          </Field>
          <Field id="sg-bio" label="Despre tine">
            <Textarea id="sg-bio" placeholder="Câteva cuvinte…" />
          </Field>
          <Field id="sg-domain" label="Domeniu">
            <Select>
              <SelectTrigger id="sg-domain" className="w-full">
                <SelectValue placeholder="Alege domeniul" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Checkbox id="sg-terms" />
              <Label htmlFor="sg-terms">Accept termenii</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="sg-notify" />
              <Label htmlFor="sg-notify">Notificări pe email</Label>
            </div>
            <p id="sg-account-type" className="text-sm font-medium">
              Tip cont
            </p>
            <RadioGroup defaultValue="mentee" aria-labelledby="sg-account-type">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="mentee" id="sg-mentee" />
                <Label htmlFor="sg-mentee">Mentorat</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="mentor" id="sg-mentor" />
                <Label htmlFor="sg-mentor">Mentor</Label>
              </div>
            </RadioGroup>
          </div>
        </Section>

        <Section title="Card, badge-uri, avatar">
          <Card className="w-80">
            <CardHeader className="flex flex-row items-center gap-3">
              <Avatar>
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Ana Marin</CardTitle>
                <CardDescription>Senior Product Manager</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="flex items-center gap-1 text-sm">
                <StarIcon className="size-4 fill-rating text-rating" aria-hidden />
                4,9 · 32 de recenzii
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">Disponibil azi</Badge>
                <Badge variant="secondary">Product Management</Badge>
                <Badge variant="outline">Test</Badge>
                <Badge variant="destructive">Plin</Badge>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section title="Dialog, tab-uri, tooltip, notificare">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Deschide dialogul</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Încheie mentoratul?</DialogTitle>
              <DialogDescription>Ședințele deja programate rămân valabile.</DialogDescription>
            </DialogContent>
          </Dialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent>Un singur call gratuit pe cont</TooltipContent>
          </Tooltip>
          <Button variant="outline" onClick={() => toast.success('Aplicarea a fost trimisă.')}>
            Arată o notificare
          </Button>
          <Tabs defaultValue="sesiuni" className="w-80">
            <TabsList>
              <TabsTrigger value="sesiuni">Ședințe</TabsTrigger>
              <TabsTrigger value="progres">Progres</TabsTrigger>
            </TabsList>
            <TabsContent value="sesiuni">Ședințele următoare.</TabsContent>
            <TabsContent value="progres">Evaluări și obiective.</TabsContent>
          </Tabs>
        </Section>

        <Section title="Încărcare (Skeleton)">
          <div className="w-80 space-y-2" aria-hidden>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </Section>
      </div>
    </TooltipProvider>
  )
}
