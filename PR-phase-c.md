## feat: phase C — matching quiz, recommendations and top mentors

## What & why

Phase C of the UI plan (tickets 298, 299): the quiz from Figma (screens 02–07) and Top Mentori (screen 01). UI only; the recommendations come from sample data.

| Step  | Route                         | What                                                                                                  |
| ----- | ----------------------------- | ----------------------------------------------------------------------------------------------------- |
| C1    | —                             | Quiz logic in one hook (`useQuiz`): steps, answers, Back / Continue, a message if nothing is selected |
| C2    | `/test-potrivire`             | Intro „Mentorul potrivit începe cu tine” + the 4 steps + progress bar                                 |
| C3–C6 | `/test-potrivire`             | Steps Objective, Level, Domain (+ interests, multiple choice), Pace (+ „Sari peste acest pas”)        |
| C7    | `/test-potrivire/recomandari` | „Top 3 mentori recomandați”: what we took into account + 3 mentors, each with „De ce vă potriviți”    |
| C8    | `/top-mentori`                | „Top mentori, impact real” with a domain filter                                                       |

- **The answers live in the URL** (`?obiectiv=…&nivel=…`): the recommendations survive a refresh, and „Ajustează răspunsurile” reopens the quiz pre-filled. The URL values are validated; anything unknown is ignored.
- **The recommendation** is a pure function (`recommendMentors`): domain, then objective, then level.
- **Landing:** „Găsește-ți mentorul” and „Află cum funcționează” now go to the quiz.
- **Small shared changes:** `OptionCard` gets a `size="regular"` (the quiz size from Figma); the mentor card can show a custom label („PRIMA RECOMANDARE”); the rounded button classes moved to `src/constants`.

## Not included (intentionally)

- **„Vezi profilul” / „Aplică la mentorat”** have no page yet → phase D (mentor profile).
- **„Explorează toți mentorii”** goes to Top Mentori for now; the full search (screen 09) is phase D.

## How to verify

```bash
npm ci && npm run dev
```

- `/` → „Găsește-ți mentorul” → „Începe testul” → „Continuă” without an answer → message; complete the 4 steps → recommendations.
- Refresh on the recommendations page → same result; „Ajustează răspunsurile” → the quiz pre-filled.
- `/top-mentori` → „Management” → only Elena Ionescu.

## Checklist

- [x] Lint / typecheck / format / build pass
- [x] Full flow checked with Playwright (error, Back keeps answers, URL, adjust, invalid params, filter); no overflow 320–1440; no console errors
- [x] Code review + UI/a11y review before opening the PR: fixes in the last commit (match reasons built from the answers, focus back on the intro, error re-announced + `aria-invalid`, option label not read twice, aligned cards)
- [ ] „Toate domeniile” on Top Mentori shows the 3 top mentors (as in Figma); the domain filters show every mentor in that domain
