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

## Routes

| Path                   | Page                                 |
| ---------------------- | ------------------------------------ |
| `/`                    | redirects to `/autentificare`        |
| `/autentificare`       | Login                                |
| `/inregistrare`        | Student signup                       |
| `/inregistrare/mentor` | Mentor signup + documents            |
| `/parola-uitata`       | Forgot password                      |
| `/resetare-parola`     | Reset password                       |
| `/cursant`             | Student account (placeholder)        |
| `/mentor`              | Mentor account (placeholder)         |
| `/dev/componente`      | Shared components preview (dev only) |
| anything else          | 404                                  |

## Authentication (Team Decision)

- Credentials are submitted as plain JSON over HTTPS.
- The backend returns a **JWT**, stored in a **cookie** (never `localStorage` or `sessionStorage`).
- Every authenticated request sends `Authorization: Bearer <token>`.
- Until the backend is connected, login actions log form values in development with the password masked.
