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

## Team rules

The shared rules for working on this project are in [`CONTRIBUTING.md`](CONTRIBUTING.md).

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

<img width="360" height="2043" alt="dashboard-mentor-mobil" src="https://github.com/user-attachments/assets/43de2edc-5d0e-4367-8e05-e0f95b221192" />
<img width="1024" height="1177" alt="dashboard-mentor-desktop" src="https://github.com/user-attachments/assets/83c5c9af-2477-4871-aa98-96ff2e3e97b4" />

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
| `/mentor`                             | Mentor dashboard                                    |
| `/dev/componente`                     | Shared components preview (dev only)                |
| anything else                         | 404                                                 |

## Authentication (Team Decision)

- Requests go to `/api`, proxied to the backend by Vercel (`vercel.json`) and by the Vite dev server (`vite.config.ts`).
- The **access token** is kept only in memory (never in `localStorage`, `sessionStorage` or a JS cookie) and sent as `Authorization: Bearer <token>`.
- The **refresh token** is an `httpOnly` cookie handled by the browser. The app refreshes the session on start and once on a `401`.
