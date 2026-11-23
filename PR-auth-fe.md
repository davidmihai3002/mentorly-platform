## feat: complete authentication UI (FE)

## What & why

The colleague's request: remove „(minim 16 ani)”, two signup links (student + mentor) and everything else that belongs to authentication on the frontend. Only UI, no backend: the actions write the data to the console in dev, with passwords masked.

| What                                                                                      | Route                  | Notes                                                                                                                                         |
| ----------------------------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Login: no age note, links „Înregistrează-te ca și cursant” + „Înregistrează-te ca mentor” | `/autentificare`       | „Ai uitat parola?” is now a real link                                                                                                         |
| **Mentor signup** (Figma „Autentificare și înscriere mentor”)                             | `/inregistrare/mentor` | 2 columns: account + documents panel (LinkedIn required, CV upload PDF ≤ 5 MB with drag-and-drop, optional certificates, verification status) |
| **Forgot password**                                                                       | `/parola-uitata`       | Email → neutral message („dacă există un cont…”)                                                                                              |
| **Reset password**                                                                        | `/resetare-parola`     | New password + confirmation, the same rules as signup                                                                                         |
| **Logout**                                                                                | „Deconectare”          | Takes you to login with „Te-ai deconectat cu succes.”, shown only once                                                                        |

**Structure:** all of this lives in `features/auth` — one component per file, logic in `utils/` (CV validation, masked logging) and `hooks/` (`useMentorSignupForm`, `useForgotPasswordForm`, `useResetPasswordForm`, `useLogoutNotice`), shared Zod schemas (email, new password).

## Not included (intentionally)

- **Forgot / reset password have no screen in Figma** → they use the login card style; the design team can adjust them.
- **LinkedIn / Google / sending the files**: buttons only (dev console log), no backend.

## How to verify

```bash
npm ci && npm run dev
```

- `/autentificare`: the 2 links; „Ai uitat parola?” → `/parola-uitata`.
- `/inregistrare/mentor`: „Intră în cont” without LinkedIn → error; connect LinkedIn; upload a `.txt` → error; upload a `.pdf` → its name shows up; submit → log in the console (password masked).
- `/resetare-parola`: different passwords → „Parolele nu coincid.”
- `/cursant` → „Deconectare” → message on login.

## Checklist

- [x] Lint / typecheck / format / build pass
- [x] All flows checked with Playwright; no password in clear in the console
- [x] Trial merge with `main` with no conflicts
- [ ] Code review (after opening the PR)
