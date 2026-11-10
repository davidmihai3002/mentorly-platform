# Mentorly — Frontend

Platformă de mentorat: React + Vite + TypeScript, Tailwind CSS și componente shadcn/ui
(Base UI). Interfața e doar în limba română.

## Pornire

```bash
npm ci
npm run dev   # http://localhost:5173
```

| Comandă                           | Ce face                         |
| --------------------------------- | ------------------------------- |
| `npm run dev`                     | Server de dezvoltare            |
| `npm run build`                   | Verificare de tipuri + build    |
| `npm test`                        | Testele (Vitest)                |
| `npm run lint`                    | ESLint                          |
| `npm run format` / `format:check` | Prettier: formatează / verifică |

## Structura

```text
src/
  components/ui/      componente shadcn, copiate manual din ui.shadcn.com (tab-ul „Manual”)
  features/<nume>/
    components/       o componentă React per fișier
    hooks/            logică React (hooks)
    utils/            logică fără React (funcții pure, cu teste)
    schemas/          validare (Zod)
    types/            tipuri TypeScript
    constants/        texte și valori fixe
    index.ts          ce exportă feature-ul către restul aplicației
```

- Fiecare folder are un `index.ts` (barrel). În afara unui feature se importă doar din
  `@/features/<nume>`; în interiorul aceluiași folder se importă direct din fișier.
- Un folder se creează doar când are conținut.
- Culorile și fonturile sunt în `src/index.css`; `src/theme.test.ts` verifică contrastul.

## Autentificare (decizie de echipă)

- Login-ul trimite emailul și parola ca JSON, prin HTTPS. Frontend-ul nu codează datele.
- Backend-ul răspunde cu un **JWT**, păstrat într-un **cookie**, niciodată în `localStorage` sau
  `sessionStorage`.
- După login, **fiecare cerere** trimite token-ul în header: `Authorization: Bearer <token>`.
- Pentru că frontend-ul citește cookie-ul, acesta nu poate fi `httpOnly`. De aceea: `Secure`,
  `SameSite=Strict`, token cu durată scurtă și protecție XSS (CSP, fără HTML din date).
- Până la backend, butoanele paginii de login afișează în consolă datele completate, cu parola
  mascată, doar în modul de dezvoltare.
