# Mentorly — Frontend

React + Vite + TypeScript + Tailwind CSS + shadcn/ui (Base UI).

## Commands

```bash
npm ci
npm run dev          # http://localhost:5173
npm run typecheck    # TypeScript check
npm run lint         # ESLint
npm run format:check # Prettier check
npm run build        # Production build
```

## CI

GitHub Actions runs `npm ci`, lint, typecheck, format check and build on every pull request to `main` and on every push to `main`. The build output (`dist`) is uploaded as an artifact for 7 days.

## Project Structure

```text
src/
  app/
    router/           routes (React Router), lazy-loaded pages
    layouts/          Root, Public, Auth and Account layouts
    pages/            app-level pages (404, placeholders)
    dev/              dev-only pages (components preview)
  components/
    ui/               shadcn/ui primitives (installed manually from the Manual tab)
    layout/           shared header, footer, logo, page backdrop
    common/           shared UI from Figma (mentor card, tags, option card)
  constants/          routes, shared copy, sample data and style classes
  hooks/              shared React hooks
  types/              shared TypeScript types
  utils/              shared pure helpers
  features/<name>/
    components/       one small, reusable React component per file
    hooks/            React hooks
    utils/            pure TypeScript logic (no React hooks)
    schemas/          Zod validation schemas
    types/            TypeScript types
    constants/        static UI copy and constants
    index.ts          public feature barrel
```

## Screenshots

<img width="360" height="2441" alt="profil-cursant-mobil" src="https://github.com/user-attachments/assets/a55a6fde-abe3-4c08-aa36-90e16113f74a" />
<img width="1024" height="1423" alt="profil-cursant-desktop" src="https://github.com/user-attachments/assets/327e8ea9-6316-454e-a56c-eb349696e064" />

## Routes

| Path                                  | Page                                                |
| ------------------------------------- | --------------------------------------------------- |
| `/`                                   | Home (landing hero)                                 |
| `/ce-este-mentorly`                   | Why mentoring (3 benefit cards)                     |
| `/comunitate`                         | Community Q&A                                       |
| `/recenzii`                           | Success stories                                     |
| `/parteneri`                          | Partners                                            |
| `/autentificare`                      | Login                                               |
| `/inregistrare`                       | Student signup                                      |
| `/inregistrare/mentor`                | Mentor signup + documents                           |
| `/parola-uitata`                      | Forgot password                                     |
| `/resetare-parola`                    | Reset password                                      |
| `/mentori`                            | Mentor search: filters, sort, grid/list             |
| `/mentori/:id`                        | Public mentor profile + application                 |
| `/mentori/:id/recenzii`               | Detailed reviews                                    |
| `/cursant/recenzie/:id`               | Write a review                                      |
| `/cursant/rezervare/:id`              | Booking calendar → summary → payment → confirmation |
| `/cursant/rezervare/:id/reprogramare` | Reschedule a session                                |
| `/cursant/proiecte`                   | My projects + feedback                              |
| `/cursant`                            | Student profile (inline editing)                    |
| `/test-potrivire`                     | Matching quiz (4 steps)                             |
| `/test-potrivire/recomandari`         | Top 3 recommended mentors                           |
| `/top-mentori`                        | Top mentors with domain filter                      |
| `/mentor`                             | Mentor account (placeholder)                        |
| `/dev/componente`                     | Shared components preview (dev only)                |
| anything else                         | 404                                                 |

## Authentication (Team Decision)

- Credentials are submitted as plain JSON over HTTPS.
- The backend returns a **JWT**, stored in a **cookie** (never `localStorage` or `sessionStorage`).
- Every authenticated request sends `Authorization: Bearer <token>`.
- Until the backend is connected, login actions log form values in development with the password masked.
