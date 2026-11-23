## ci: add GitHub Actions pipeline (SCRUM-285)

## What & why

Every PR to `main` and every push to `main` now runs the checks automatically: `npm ci` (with cache), lint, typecheck, format check and build. The build (`dist`) is uploaded as an artifact for 7 days.

- Files: `.github/workflows/ci.yml`, `.nvmrc` (Node 24), README (CI section).
- Security: read-only permissions, actions pinned to SHA, `persist-credentials: false`.
- A new push to a PR cancels the old run. On `main`, runs are never cancelled.

## Not included (intentionally)

- **Tests:** not run, because we're not writing tests right now. The step gets added when tests come back (SCRUM-284).
- **Merge blocking:** this needs branch protection on `main`, which only an admin can set. @davidmihai3002, could you enable it with the required check **`ci`**?

## How to verify

- The **CI / ci** check on this PR is green.
- The run has the `dist` artifact.

## Checklist

- [x] Lint / typecheck / format / build pass locally
- [x] No secrets or debug output
- [ ] Branch protection enabled (David)
