## feat: phase D — student account (search, profile, booking, reviews, projects)

## What & why

Phase D of the UI plan: the student side of Mentorly, from Figma screens 09–20 and „Profil mentor”. UI only; data comes from a shared sample catalogue.

| Step  | Route                                          | What                                                                                                                                      |
| ----- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| D1–D2 | `/mentori`                                     | Search: search bar, filters (domain, language, price, rating, availability), removable chips, sorting, grid ↔ list. Everything in the URL |
| D4    | `/mentori/:id`                                 | Public mentor profile: badges, rating, links, pricing (session + monthly), capacity, weekly availability, experience, reviews             |
| D4    | `/mentori/:id#aplica`                          | Application form (3 questions) + admission test, validated with zod                                                                       |
| D5    | `/mentori/:id/recenzii`                        | Detailed reviews: scores by criteria, filters (5 / 4 stars), sorting, „Încarcă mai multe”, „Utilă? Da”                                    |
| D6    | `/cursant/rezervare/:id`                       | Calendar + time slots from the mentor's schedule (busy slots disabled)                                                                    |
| D7    | `…/sumar` → `…/plata` → `…/confirmare`         | Order summary → payment form (UI only) → confirmation, with „Adaugă în calendar” (local .ics)                                             |
| D8    | `…/reprogramare` → `…/reprogramare/confirmata` | Reschedule with the current booking + confirmation (old vs new slot)                                                                      |
| D9    | `/cursant/proiecte`                            | My projects: status filters, progress, submit a version (HTTPS link or PDF/ZIP ≤ 20 MB) + mentor feedback                                 |
| D10   | `/cursant/recenzie/:id`                        | Write a review: overall stars + 4 criteria, comment ≥ 30 characters, consent                                                              |

**Shared refactors:**

- The mentors live in one catalogue in `src/constants` (`MENTOR_DIRECTORY`, `MENTOR_SCHEDULES`); the quiz derives from it.
- Path helpers and `formatScore` moved to `src/utils`.

**Security (UI only):**

- Card data is validated but never stored or logged.
- The name, email and last 4 digits reach the confirmation through router state, never through the URL.
- All URL params are validated.

## Not included (intentionally)

- **„Profil cursant” (D11)**: I couldn't open that Figma frame (it's not linked in the prototype). It will come in a follow-up once we have the link.
- **Favorites (D3)**: there's no heart icon in Figma; we wait for confirmation from design.
- **Real payment / Stripe, sending applications and reviews**: backend.

## How to verify

```bash
npm ci && npm run dev
```

- `/mentori` → filters + chips + grid/list → „Vezi profilul”.
- Profile → „Programează apelul gratuit” → 23 Nov 18:00 → summary → payment (try an empty submit) → confirmation → „Cere reprogramarea”.
- `/mentori/mihai-popescu/recenzii` → „Scrie o recenzie”.
- `/cursant/proiecte` → „Predă proiectul”.

## Checklist

- [x] Lint / typecheck / format / build pass
- [x] Full flows checked with Playwright; no overflow 320–1440; no console errors
- [x] Code review + UI/a11y review before opening the PR: fixes in the last commit (strict date/time params, past time slots blocked, a confirmation without payment data shows a generic message, `.ics` with DTSTAMP, Luhn check, stricter PDF/ZIP validation, filters behind a „Filtre (n)” button on mobile, 24 px star targets, linked errors)
- [ ] Follow-up: the quiz match profiles keyed by a `MentorId` type (so a mentor without a profile fails at compile time)
