## feat: phase A — Figma alignment + shared components

## What & why

The first phase of the UI plan: everything that appears on every screen is now **exactly as in the current Figma** (values read from the Properties panel), plus the shared components the next screens need (landing, quiz, accounts).

| Step  | What changed                                                                                                                                                               |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A1    | **Roboto** font (Inter and Plus Jakarta are gone), colors from Figma: background #F6F8F9, text #080D20, button #075BC9, links #12516B, borders #DADDE0; radii and shadows  |
| A2    | **White** top bar (78 px, bottom border), logo, links, „Înregistrare” button as in Figma                                                                                   |
| A3    | Logged-in top bar: links + „Contul meu” + „Deconectare” (replaces the dropdown)                                                                                            |
| A4    | Footer + page background (waves bottom-left, grid on the right)                                                                                                            |
| A5    | Login as in Figma: compact 338 px card, title „Autentificare”, 30 px fields, texts                                                                                         |
| A6    | Signup as in Figma: 456 px card, 40 px fields, button without the Google icon                                                                                              |
| A7–A9 | `components/common`: mentor card (grid + list), badge (TOP MENTOR / MENTOR VERIFICAT), specialty chip, specialty card, primary and outline buttons, selectable option card |

- Sample data (6 mentors, 6 specialties) in `constants/`, formatting (rating, price) in `utils/`.
- **`/dev/componente`**: a preview page of the components, the equivalent of the „08 · Specialități și componente” screen. **It exists only in development**; it is not in the production build.

## Not included (intentionally)

- **The calendar** from screen 08 → phase D (booking).
- **The logo** is an approximation in SVG. In Figma it is an embedded image; if the design team sends the SVG, we swap it.
- **The background waves** are drawn in SVG to look like the image in Figma (the background is an embedded image in Figma).

## How to verify

```bash
npm ci && npm run dev
```

- `/autentificare`, `/inregistrare`: compare with the „Autentificare cursant” / „Înscriere cursant” screens.
- `/cursant`: logged-in top bar.
- `/dev/componente`: compare with „08 · Specialități și componente”.
- At 360 px: everything fits, the ☰ menu works.

## Screenshots & demo

_(drag in the files from `demo-phase-a/`: `mentorly-phase-a-demo.webm` + the PNG screenshots)_

## Checklist

- [x] Lint / typecheck / format / build pass
- [x] Trial merge with `main` with no conflicts
- [ ] Full code review (after opening the PR)
