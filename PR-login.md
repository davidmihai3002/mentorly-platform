## feat: create login page (SCRUM-297)

Pagina de autentificare cursant conform designului din Figma (`02 · Autentificare cursant`). Până la backend, acțiunile afișează în consolă datele completate (cu parola mascată).

**Ce conține**

- Componente shadcn (Base UI) copiate manual: `Button`, `Input`, `Label`
- `features/auth/`: sub-componente mici și reutilizabile (câte una per fișier: `AuthNavbar`, `AuthCardHeader`, `GoogleAuthButton`, `AuthDivider`, `AuthTextField`, `AuthPasswordField`, `AuthCardFooter`, `LoginForm`, `LoginPage`), `hooks/`, `utils/` (logică pură în `.ts`), `schemas/` (Zod), `types/` și `constants/`, fiecare cu `index.ts`
- Formular cu React Hook Form + Zod + show/hide password

**Consolă** (doar în dev, parola mascată):

```
[Mentorly] login { action: 'login', email: 'ana@mentorly.ro', password: '••••••••••• (11 caractere)' }
```

**Auth (decizie de echipă)**: datele pleacă ca JSON. JWT-ul primit de la BE se păstrează în cookie și se trimite ca `Authorization: Bearer <token>`.

**Cum testezi**

```bash
npm ci && npm run dev
npm run typecheck && npm run lint && npm run build
```

**Demo:** _(trage aici `mentorly-login-demo.webm`)_
