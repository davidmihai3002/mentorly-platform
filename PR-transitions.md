## feat: add smooth page and menu transitions

> Built on top of #12 (router). Merge #12 first; this PR will then contain only the transitions.

## What & why

Up to now the app changed screens abruptly. This PR adds short, discrete transitions (220 ms). The app feels smooth without slowing anyone down. Figma has no animations (the prototype has no flows), so these are a proposal: if the design team wants something else, everything is adjustable from a single place, `src/motion.css`.

**What moves**

- **Between pages** (native View Transitions, through React Router): the navbar and footer stay put. The card fades out, then the new content slides in 8 px. Between login and signup the card **changes height smoothly**.
- **The „Contul meu” menu**: it opens and closes with a small fade + zoom. These animations were already written in shadcn but didn't run, because `tw-animate-css` was missing.
- **The ☰ menu (mobile)**: it slides down when opening and back up when closing.
- **Form errors**: they appear smoothly instead of popping in.

**Accessibility**

- Anyone with the **„Reduce motion”** setting turned on in the system sees no animations.
- Error messages now sit in a single component, `AuthFieldError`, whose zone stays always present for screen readers, so errors get announced reliably. The layout of the forms is identical to before (measured).

**Technical**

- `AppLink` = React Router's `Link` with `viewTransition`. All internal links use it.
- New dependency: `tw-animate-css` (CSS only, no JavaScript).
- The main JavaScript file stays at 220 kB.
- In browsers without View Transitions, navigation simply happens instantly, exactly as before.
- The „Contul meu” menu keeps shadcn's original duration (100 ms); we don't modify `components/ui`.

## How to verify

```bash
npm ci && npm run dev
```

- Navbar „Înregistrare”, then „Autentifică-te” in the card: the card changes height smoothly.
- `/cursant`, then „Contul meu”: the menu opens animated.
- On mobile (360 px): the ☰ menu slides down and back up.
- „Intră în cont” with empty fields: the errors appear smoothly.
- With „Reduce motion” turned on in the system: nothing moves.

## Demo

Each transition is shown once at **real speed** and once **slowed down 5×** (demo only), with a label in the corner:

- Desktop: login ↔ signup, form errors, the „Contul meu” menu, logout → _(drag in `mentorly-transitions-desktop.webm`)_
- Mobile: the ☰ menu opening/closing, navigation from the menu → _(drag in `mentorly-transitions-mobile.webm`)_

## Checklist

- [x] Lint / typecheck / format / build pass
- [x] Code review: Code, TypeScript, React, UI, Accessibility, Visual
- [x] No conflicts; the layout is unchanged when nothing moves
- [x] No secrets or debug output
