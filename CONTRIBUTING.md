# Reguli de lucru – Mentorly FE

Regulile comune ale echipei. Scurte, ca să le citim și să le respectăm toți.

## 1. Un tichet = un branch = un PR mic

- Branch: `feature/<descriere-scurta>` sau `fix/…`, `chore/…`.
- **PR mic și segmentat**: cât mai puțin cod și cât mai puține fișiere. Dacă e mare, îl împărțim.
- Commit-uri mici, în pași: `feat: …`, `fix: …`, `refactor: …`, `docs: …`, `chore: …`.
- Merge doar după: CI verde (lint, typecheck, format, build) → review → fixuri în același PR.
- După merge: **„Delete branch”**, iar tichetul din Jira se mută pe Done.

## 2. Structura codului

```text
src/
  app/            router, layout-uri, pagini globale
  api/            clientul API, apelurile de autentificare și tipurile lor
  session/        sesiunea: provider-ul și hook-ul
  components/
    ui/           componente shadcn (instalate MANUAL, nu se modifică)
    common/       componente comune, refolosite în mai multe feature-uri
    layout/       header, footer, fundal
  constants/      date și texte comune
  types/          tipuri comune
  utils/          funcții pure comune
  features/<nume>/
    components/   o componentă React per fișier
    hooks/        hook-uri React
    utils/        logică pură (.ts, fără hook-uri)
    schemas/      validare zod
    types/        tipuri
    constants/    texte UI și date
    index.ts      exporturile feature-ului
```

- **O singură componentă per fișier.** Componentele mari se sparg în componente mici, refolosibile.
- **Logica fără hook-uri stă în `utils/`**, niciodată în fișiere `.tsx`.
- **Câte un `index.ts` în fiecare folder.** În același folder, importăm direct fișierul vecin, nu prin `index.ts`.
- Un feature nu importă din alt feature. Ce se folosește în mai multe locuri urcă în `components/common`, `constants`, `types` sau `utils`.
- Fișiere mici (~200 de linii), funcții mici (~50 de linii).

## 3. Stil

- Tailwind cu token-urile din temă, fără stiluri inline ad-hoc.
- Cod (nume, tipuri) în engleză. Textele pentru utilizator, în română, stau în `constants/`.
- **Fără comentarii în cod.** Fără teste unitare deocamdată (când revin: testăm doar logica `.ts`).
- Componentele shadcn se instalează **manual** (tab-ul „Manual” de pe ui.shadcn.com), nu prin CLI.

## 4. Design

- **Figma are ultimul cuvânt.** Urmăm ecranele exact; ce nu e în Figma se discută cu echipa de design înainte.

## 5. Doar FE

- Lucrăm doar la interfață. Unde există API, folosim src/api; în rest, date de exemplu.
- Access token-ul stă doar în memorie și se trimite ca `Authorization: Bearer <token>`; refresh token-ul e un cookie httpOnly pe care îl gestionează browserul.

## 6. Pull request

- Descriere scurtă: **ce face, cum se testează, ce rămâne**.
- **Capturi de ecran doar cu ecranele schimbate de acel PR** (desktop + mobil), în `docs/screenshots/<subiect>/`.

## 7. Ce NU intră în repo

- `.env`, `.env.*` (doar `.env.example`), secrete.
- Notițe locale, ciorne de PR, planuri, demo-uri video, backup-uri, configurări personale (`.claude/`, editor).
