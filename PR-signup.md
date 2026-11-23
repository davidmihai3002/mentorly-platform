## feat: create student signup page (SCRUM-295)

Pagina de înscriere cursant conform designului din Figma (`Înscriere cursant`). Până la backend, acțiunile afișează în consolă datele completate (cu parola și confirmarea parolei mascate).

**Ce conține**

- Componenta shadcn (Base UI) copiată manual: `Checkbox`
- `features/auth/`: sub-componente mici și reutilizabile (câte una per fișier: `AuthCheckboxField`, `SignupTermsText`, `SignupCardFooter`, `AuthFooter`, `SignupForm`, `SignupPage`), reutilizând componentele de la login (`AuthNavbar`, `AuthBackdrop`, `AuthCardHeader`, `GoogleAuthButton`, `AuthDivider`, `AuthTextField`, `AuthPasswordField`)
- `hooks/` (`useSignupForm`), `utils/` (`logSignupAction` în `.ts`), `schemas/` (`signupSchema` Zod), `types/` și `constants/`, fiecare cu `index.ts`
- Validare React Hook Form + Zod (nume complet, email valid, parolă minim 8 caractere cu o literă mare și o cifră, coincidența parolelor, confirmare vârstă 16+ și acceptare Termeni & Politică de confidențialitate)

**Consolă** (doar în dev, parolele mascate):

```text
[Mentorly] signup {
  action: 'signup',
  fullName: 'Andreea Marin',
  email: 'andreea@mentorly.ro',
  password: '••••••••• (9 caractere)',
  confirmPassword: '••••••••• (9 caractere)',
  isAgeConfirmed: true,
  isTermsAccepted: true
}
```

**Cum testezi**

```bash
npm ci && npm run dev
npm run typecheck && npm run lint && npm run build
```

**Demo:** _(trage aici `mentorly-signup-demo.webm`)_
