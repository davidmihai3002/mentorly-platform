# Mentorly — Frontend

Platformă de mentorat care conectează tineri la început de carieră cu mentori verificați.
Aplicație web responsive, doar în limba română, prețuri în RON.

- **Backend:** [mentorly-api](https://github.com/davidmihai3002/mentorly-api) (NestJS + PostgreSQL)
- **Jira:** [SCRUM board](https://ancadrehluta.atlassian.net/jira/software/projects/SCRUM/boards/1)
- **Decizii tehnice:** `docs/adr/` (vin cu SCRUM-271)

## Cerințe

- **Node.js 24** (versiunea e în `.nvmrc`; cu nvm: `nvm use`; pe Windows: nvm-windows sau fnm)
- npm 11

## Pornire locală

```bash
npm ci                      # instalează dependențele exact ca în package-lock.json
cp .env.example .env.local  # apoi completează valorile
npm run dev                 # http://localhost:5173
```

## Scripturi

| Comandă                           | Ce face                                              |
| --------------------------------- | ---------------------------------------------------- |
| `npm run dev`                     | Server de dezvoltare cu reîncărcare automată         |
| `npm run build`                   | Verificare de tipuri + build de producție în `dist/` |
| `npm run preview`                 | Servește local build-ul din `dist/`                  |
| `npm run typecheck`               | Doar verificarea de tipuri (TypeScript strict)       |
| `npm run lint` / `lint:fix`       | ESLint (cu reguli pe tipuri) / cu reparare automată  |
| `npm run format` / `format:check` | Prettier: formatează / doar verifică                 |

## Structura

```text
src/
  app/          # pornirea aplicației: providers, router, layout-uri
  components/   # componente comune (ui/ = shadcn)
  features/     # cod pe funcționalități
    auth/  mentors/  applications/  sessions/
    payments/  progress/  notifications/  sponsors/
  lib/          # utilitare fără legătură cu React (formatare, validare, API)
    api/        # client HTTP (api.get/post...), erori în română, TanStack Query
```

**Regula:** codul unei funcționalități stă în `features/<nume>/`. Ce folosesc două sau mai
multe funcționalități se mută în `components/` sau `lib/`.

**Importuri:** folosește alias-ul `@/` în loc de căi relative lungi (exemplu):

```ts
import { Button } from '@/components/ui/button'
```

## Mock-uri API (fără backend)

Cu `VITE_USE_MOCKS=true` (implicit în `.env.example`), cererile către API sunt servite de
[MSW](https://mswjs.io) direct în browser, din `src/mocks/`. Așa construim ecranele fără
backend. În build-ul de producție, cu `VITE_USE_MOCKS=false`, codul mock nu există.

| Cont de test | Email                   | Parolă            |
| ------------ | ----------------------- | ----------------- |
| Cursant      | `cursant@mentorly.test` | `parola-mock-123` |
| Mentor       | `mentor@mentorly.test`  | `parola-mock-123` |

Adresele și formele răspunsurilor din `src/mocks/handlers.ts` sunt provizorii, până la
contractul OpenAPI al backend-ului. În teste, aceleași handler-e rulează cu `msw/node`.

## Variabile de mediu

Lista completă e în [`.env.example`](.env.example), iar tipurile în `src/vite-env.d.ts`.

> Orice variabilă `VITE_*` ajunge în codul trimis în browser. **Nu pune niciodată secrete
> în ele.** Fișierele `.env` și `.env.*` sunt ignorate de git, cu excepția `.env.example`.

## Cum lucrăm

1. Un tichet Jira = un branch = un PR: `feature/SCRUM-XX-descriere-scurta`.
2. **Commit-uri** după [Conventional Commits](https://www.conventionalcommits.org/):
   tip, apoi descriere cu literă mică, apoi cheia tichetului (convenție de echipă):
   `feat: pagina de login (SCRUM-297)`. Tipuri: `feat`, `fix`,
   `refactor`, `docs`, `test`, `chore`, `perf`, `ci`, `build`, `style`, `revert`.
3. La fiecare commit rulează automat:
   - **pre-commit:** ESLint + Prettier doar pe fișierele modificate (lint-staged);
   - **commit-msg:** commitlint verifică formatul mesajului.
4. PR-ul primește review de la celălalt developer FE, apoi se face merge în `main`.
5. **Fără `--no-verify`.** Dacă un hook pică, se repară codul, nu se ocolește verificarea.
