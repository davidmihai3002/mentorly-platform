## feat: phase B — landing and public pages

## What & why

Phase B of the UI plan (tickets 290, 291): the public pages from Figma. In Figma each top-bar link is **its own screen**, and the active link is underlined. So the pages are separate routes, not anchors on one long page.

| Step | Route               | What                                                                                                       |
| ---- | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| B7   | top bar             | „Ce este Mentorly / Comunitate Q&A / Recenzii / Parteneri” go to their pages; the active one is underlined |
| B1–2 | `/`                 | Hero: title, text, „Găsește-ți mentorul”, „Devino mentor”, illustration (replaces the login redirect)      |
| B3   | `/ce-este-mentorly` | „De ce mentorat și nu meditații?” with the 3 cards (the highlighted state from Figma on hover/focus)       |
| B4   | `/recenzii`         | „Povești de succes”: 3 reviews with stars                                                                  |
| B5   | `/parteneri`        | 3 partner cards, „Experiența voastră…” panel, „Devino partener Mentorly” card (mailto)                     |
| B6   | `/comunitate`       | „Comunitate & întrebări frecvente”: text + 2 question cards                                                |

- Values (sizes, colors, borders, shadows) were read from the Figma Properties panel.
- Everything lives in `features/landing`: one component per file, texts and sample data in `constants/`. The pages are lazy-loaded (a separate 7 kB gzip chunk).

## Not included (intentionally)

- **„Găsește-ți mentorul” / „Află cum funcționează”** lead to `/inregistrare` for now. In Figma they open the quiz, so phase C will switch them to it.
- **Links with no page yet** (partner profile, educational initiatives, payment safety) are plain text, not links.
- **Hero illustration and avatars** are SVG / initials approximations, because they are raster images in Figma. If the design team exports them, we swap them in.
- The **„deja acolo.” accent** uses the existing indigo (#4F46E5); Figma doesn't expose the color of that text span.

## How to verify

```bash
npm ci && npm run dev
```

- `/`: hero; „Devino mentor” → `/inregistrare/mentor`.
- Click each top-bar link → its page opens and the link is underlined.
- At 360 px: everything fits, and the ☰ menu marks the current page.

## Checklist

- [x] Lint / typecheck / format / build pass
- [x] 5 pages × 5 widths (320–1440): no horizontal overflow, one `h1`, active link exposed via `aria-current`, no console errors
- [x] Code review + UI/a11y review before opening the PR: fixes in the last commit (partners layout at 768, focus ring offset, star rating and verified badge for screen readers, shared `Pill` / `CardGrid`)
- [ ] Partner names „X / Y / Z” and „Focus: ……” are placeholders in Figma — design team to send the real ones
