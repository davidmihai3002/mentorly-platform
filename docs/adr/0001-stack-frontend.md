# ADR 0001 — Stack-ul frontend, hosting-ul de staging și mesageria de grup

|               |                                                                           |
| ------------- | ------------------------------------------------------------------------- |
| **Status**    | Acceptat                                                                  |
| **Data**      | 2026-11-07 (hosting actualizat 2026-11-09)                                |
| **Tichet**    | [SCRUM-271 · FE-F01](https://ancadrehluta.atlassian.net/browse/SCRUM-271) |
| **Autor**     | teo (Frontend)                                                            |
| **Afectează** | toate tichetele FE (SCRUM-272 → SCRUM-335)                                |

## Context

- Mentorly este o aplicație web responsive, doar în limba română, cu prețuri în RON
  (documentul de cerințe, §3). Frontend-ul și backend-ul sunt în repo-uri separate:
  `mentorly-platform` (FE) și `mentorly-api` (NestJS + PostgreSQL).
- Pe 2026-11-07, ambele repo-uri sunt template-uri goale: backend-ul nu are încă
  endpointuri și nici contract OpenAPI.
- Pe FE lucrează doi developeri (teo și Casian), pe tichete interdependente. Avem nevoie de
  convenții comune înainte de primul ecran.
- Definition of Done ([SCRUM-8](https://ancadrehluta.atlassian.net/browse/SCRUM-8)) cere
  cod revizuit, teste care trec și deploy pe staging, deci avem nevoie de un mediu de
  staging de la început.

## Decizia 1 — Stack-ul

Versiunile de mai jos sunt cele stabile, verificate pe npm pe 2026-11-07. Fixăm versiunea
majoră; actualizările minore sunt permise.

| Zonă               | Alegere                                       | Versiune        | De ce                                                                                    |
| ------------------ | --------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------- |
| UI                 | React                                         | 19.3            | Decis în documentul de cerințe (§3)                                                      |
| Build / dev server | Vite                                          | 8.x             | Decis în §3; deja în repo                                                                |
| Limbaj             | TypeScript, `strict`                          | **6.0.x**       | Vezi „TypeScript 7” mai jos                                                              |
| Rutare             | React Router                                  | 8.x             | Standardul pentru SPA-uri React; lazy loading pe rute (F05)                              |
| Date de la server  | TanStack Query                                | 5.x             | Cache, retry, invalidare după mutații, stări de loading/eroare                           |
| Formulare          | React Hook Form + Zod + `@hookform/resolvers` | 7.x / 4.x / 7.x | Validare declarativă; aceeași schemă Zod validează și răspunsurile API                   |
| Stilizare          | Tailwind CSS (`@tailwindcss/vite`)            | 4.x             | Temă cu tokens din moodboard, configurare din CSS (`@theme`)                             |
| Componente         | shadcn/ui (CLI `shadcn`)                      | 4.x             | Componentele sunt copiate în repo (`src/components/ui`), deci le putem adapta designului |

**Folosite de tichetele următoare.** Le notăm aici ca să nu alegem altceva pe parcurs:

| Zonă                     | Alegere                                            | Tichet          |
| ------------------------ | -------------------------------------------------- | --------------- |
| Mock API                 | MSW 3.x                                            | SCRUM-283 (F13) |
| Teste                    | Vitest 5.x + Testing Library 16.x + Playwright 1.x | SCRUM-284 (F14) |
| Tipuri din contractul BE | `openapi-typescript` 7.x                           | SCRUM-276 (F06) |

### Cum folosim React Router

Folosim **data mode** (`createBrowserRouter` + `lazy` pe rute), **nu** framework mode.
Aplicația este un SPA, iar documentul nu cere SSR. Framework mode ar adăuga un server
Node pe care nu-l putem găzdui pe hosting static (Decizia 2).

### Starea aplicației

- **Datele de la server** stau doar în TanStack Query, nu se copiază într-un store global.
- **Starea de autentificare** e expusă printr-un React Context (`useAuth`, SCRUM-277).
- **Fără Redux sau Zustand** până nu apare o nevoie concretă de stare globală pe client
  (YAGNI). Dacă apare, se scrie un ADR nou.

### TypeScript 7

TypeScript 7.0 (portarea nativă) a apărut în iulie 2026. **`typescript-eslint` 8.x suportă
însă doar `typescript >=4.8.4 <6.1.0`**, așa că rămânem pe TS 6.0.x (repo-ul are deja
`~6.0.3`). Facem upgrade la TS 7 doar după ce `typescript-eslint` îl suportă oficial.
Altfel lint-ul pe tipuri se strică fără să ne dăm seama.

### Alternative respinse

| Alternativă                           | De ce nu                                                                          |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| Next.js / React Router framework mode | SSR nu e cerut; documentul a decis React + Vite; ar complica hosting-ul           |
| Redux Toolkit / Zustand               | Starea e aproape toată de la server, iar TanStack Query o acoperă                 |
| Formik + Yup                          | Re-randează mai mult decât RHF; Zod ne dă tipuri TS direct din schemă             |
| MUI / Chakra / Mantine                | Cerința echipei este shadcn/ui; aspectul lor implicit e greu de adus la moodboard |

## Decizia 2 — Hosting de staging: Vercel

**Alegere:** FE-ul se publică pe **Vercel**, legat de repo-ul GitHub. Decizia a fost luată
de echipă pe 2026-11-09 (David): Vercel este standardul pentru aplicații FE.

**Configurare:**

- Branch-ul `main` → staging. Fiecare PR primește automat un URL de preview, pe care QA și
  PO îl pot testa înainte de merge.
- Build `npm run build`, output `dist`.
- **Linkurile directe** (de ex. `/mentori/123`) dau 404 pe Vercel fără un `vercel.json`
  cu rewrite către `index.html`. Fișierul se adaugă în SCRUM-286 (F16):

  ```json
  {
    "$schema": "https://openapi.vercel.sh/vercel.json",
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

- Variabilele de mediu se setează per mediu în Vercel, de ex. `VITE_API_URL`. **Atenție:**
  orice variabilă `VITE_*` ajunge în bundle-ul public, deci nu punem secrete în ele.

**De știut:**

- **Contul:** repo-ul e pe contul lui David, deci el îl importă în Vercel.
- **Planul gratuit (Hobby)** e pentru uz necomercial. E în regulă pentru staging-ul
  proiectului. La lansarea publică, cu plăți, trebuie trecut pe Pro sau mutat.
- **Domeniul** se stabilește împreună cu BE. Dacă sesiunea folosește cookie `httpOnly`
  (SCRUM-277), FE și BE ar trebui să fie pe același domeniu (de ex. `app.` și `api.`).
  Altfel cookie-ul e third-party și browserele îl pot bloca.

Referințe: [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite),
[Vercel — Commercial usage](https://vercel.com/docs/limits/fair-use-guidelines#commercial-usage).

## Decizia 3 — Mesageria de grup: FE independent de furnizor

Aplicația de mesagerie (Telegram, Discord, Slack sau alta) **nu este aleasă**
(documentul de cerințe §9 și §17, SCRUM-195). Backend-ul o ascunde în spatele unei interfețe
de furnizor.

**Decizia pentru FE:**

- FE-ul **nu integrează niciun SDK** de mesagerie. Primește de la API doar datele grupului
  și afișează butoanele „Intră în grupul privat” / „Intră în grupul cohortei”
  (SCRUM-307 / C10).
- Forma minimă pe care o așteptăm (de confirmat cu BE în contractul OpenAPI):

  ```ts
  type GroupLink = {
    type: 'PRIVATE' | 'COHORT'
    inviteUrl: string // URL absolut, https
    provider: string // doar pentru afișare (nume, iconiță)
  }
  ```

- **Securitate:** `inviteUrl` vine dintr-un serviciu extern, deci îl tratăm ca date
  nesigure. Îl validăm cu Zod (`z.url()`, doar protocolul `https:`), îl deschidem cu
  `target="_blank" rel="noopener noreferrer"` și nu îl interpretăm niciodată ca HTML.
  După ce se alege furnizorul, restrângem și domeniul (allowlist).
- **Consecință:** schimbarea furnizorului nu cere nicio modificare în FE, în afară de iconița
  afișată.

## Decizia 4 — Sursa de design

- **UI kit în Figma: de confirmat.** [SCRUM-26](https://ancadrehluta.atlassian.net/browse/SCRUM-26)
  (design system în Figma) este închis, dar nu conține un link către fișier. Până la
  confirmare, **sursa de design provizorie este moodboard-ul**
  ([`docs/design/moodboard.webp`](../design/moodboard.webp)).
- Dacă apare un fișier Figma, **acesta are prioritate** față de moodboard (cerința
  SCRUM-271). Actualizăm atunci [`docs/design/inventar-ui.md`](../design/inventar-ui.md).
- Tokens-urile, componentele și ecranele de acoperit sunt în
  [`docs/design/inventar-ui.md`](../design/inventar-ui.md).

## Consecințe

### Pozitive

- Ambii developeri FE lucrează pe aceleași convenții; tichetele F02–F19 nu mai redeschid
  alegerea stack-ului.
- Cu MSW + `openapi-typescript`, FE-ul nu e blocat de backend, iar schimbările de contract
  apar ca erori de compilare.
- Preview-ul pe fiecare PR acoperă cerința DoD „verificat de QA și PO” fără muncă manuală.

### Negative și riscuri asumate

| Risc                                                                         | Măsură                                                                                                                                             |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Componentele shadcn sunt cod copiat în repo, deci nu se actualizează singure | Le tratăm ca pe cod propriu; upgrade-urile se fac manual, pe tichet separat                                                                        |
| Un SPA are SEO limitat pe paginile publice (landing, profil mentor)          | `<title>`/`<meta>` per pagină (suportate nativ de React 19) și Open Graph în SCRUM-289 (F19); SSR doar printr-un ADR nou dacă SEO devine prioritar |
| Upgrade-ul la TS 7 e blocat de `typescript-eslint`                           | Reevaluăm la fiecare sprint                                                                                                                        |
| Planul Hobby de la Vercel nu acoperă uzul comercial                          | La lansare: Vercel Pro sau mutare (aplicația e statică, se mută ușor)                                                                              |

## Puncte deschise pentru echipă

1. **i18n:** documentul de cerințe (§3) spune „nu este nevoie de un framework i18n, dar nu
   blocați adăugarea unuia mai târziu”, iar SCRUM-282 (F12) cere `react-i18next`. Decizia
   aparține tichetului F12; o semnalăm ca să fie luată conștient.
2. **Strategia de sesiune** (cookie `httpOnly` vs. token) — SCRUM-277, împreună cu BE.
   Influențează alegerea domeniilor de la Decizia 2.
3. **Fișierul Figma** — există sau nu (Decizia 4).
4. **Importul în Vercel** — îl face David, owner-ul repo-ului (Decizia 2).
