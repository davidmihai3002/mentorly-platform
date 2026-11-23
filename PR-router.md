## feat: add router, shared layouts and 404 page (SCRUM-275)

## What & why

The app now has real routes (React Router) instead of switching between login and signup with `useState`. The top bar follows the dark navbar from Figma and is shared by every page.

| Route                 | Page                                                              |
| --------------------- | ----------------------------------------------------------------- |
| `/`                   | redirects to `/autentificare` (until the landing page, SCRUM-290) |
| `/autentificare`      | Login                                                             |
| `/inregistrare`       | Student signup                                                    |
| `/cursant`, `/mentor` | empty account pages (skeleton, with the „Contul meu” menu)        |
| anything else         | 404                                                               |

**What it contains**

- `src/app/`: `router/`, `layouts/` (Root, Public, Auth, Account), `pages/` (404, placeholders), `hooks/`
- `src/components/layout/`: header, footer, logo, account menu, mobile menu, skip link. These used to live inside `features/auth`; they are now shared.
- `src/constants/`: `ROUTES` and the shared texts
- New dependency: `react-router` (8.5.1)
- shadcn `DropdownMenu` (Base UI), copied manually from the registry
- `package.json`: `"sideEffects": ["*.css"]`, so the build can drop unused code from the barrel files (`index.ts`)
- Login and signup are lazy-loaded. The account layout (with the menu) loads only on account pages. The main JS file went from 413 kB to 220 kB.
- Scroll restoration on navigation; a `<title>` on every page

**Accessibility** (reviewed against WCAG 2.2 AA)

- Below 1024 px the navbar links are in a menu (☰), because they didn't fit and were simply disappearing.
- The navbar fits at 320 px. It used to overflow the screen at 375 px and 768 px.
- After navigation, focus moves to the page content. A „Sari la conținut” link was added.

## Not included (intentionally)

- **Logout** only redirects to login for now. It will clear the session in SCRUM-277.
- **Page protection** (guest → login) comes in SCRUM-278.
- **The error screen** (ErrorBoundary) comes in SCRUM-280.
- **The navbar/footer links** (Ce este Mentorly, Contact etc.) don't lead anywhere yet; those pages don't exist.
- **The 404 page and the mobile menu** have no frame in Figma. They are built in the style of the existing pages and can be adjusted when design 1.0 arrives.

## How to verify

```bash
npm ci && npm run dev
```

- Open `/`: you land on `/autentificare`.
- „Înregistrare” in the navbar, then „Autentifică-te” in the card: you switch between the pages.
- `/orice`: the 404 page; the button takes you back.
- `/cursant`, then „Contul meu” → „Deconectare”: you go back to login.
- On mobile (360 px): the ☰ menu with the links.

## Screenshots & demo

_(drag in `mentorly-router-demo.webm` and the screenshots from the `demo-275/` folder)_

## Checklist

- [x] Lint / typecheck / format / build pass (CI)
- [x] Code review: Code, TypeScript, React, UI vs. Figma, Accessibility, Visual
- [x] No conflicts with `main`
- [x] No secrets or debug output
