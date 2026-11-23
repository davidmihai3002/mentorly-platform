# Plan Sprint 2 — Frontend (teo + Casian)

**Sprint:** 5 → 19 noiembrie 2026 · **Rămân:** 9 zile lucrătoare (luni 9 – joi 19)
**Actualizat:** 10 noiembrie 2026 · **Sursa:** Jira SCRUM, tichetele FE-* din Sprint 2

## 0. Stare la 10 noiembrie

- Gata, în review (lanț liniar, fără conflicte): **#3 272 → #4 273 → #2 281 → 275**; #1 271 e independent.
- Merge-urile le fac Casian sau David, în ordinea lanțului, cu „Delete branch” după fiecare.
- Calendarul de mai jos a alunecat: review-urile încep pe 11 noiembrie. Continuăm cu 276 → 274 → 283 → 279.

## 1. Decizii (luate pe 9 noiembrie)

1. **Implementăm toate tichetele FE din sprint**, inclusiv pe cele ale lui Casian. Casian
   face review. Trebuie anunțat pe grup și realocat în Jira (vezi §6).
2. **Prioritizăm.** Fundația până la staging și autentificarea sunt obligatorii. Restul
   îl propunem din timp pentru Sprint 3.
3. **Story-urile vechi** (87, 101, 89, 95, 107, 113) nu le lucrăm și nu le atingem.
4. **Nu așteptăm pe nimeni:** lucrăm cu mock-uri și placeholder-e. Ce ne lipsește cerem
   într-un singur mesaj (§6).

## 2. Situația

|           | Tichete | SP     | Gata                                 |
| --------- | ------- | ------ | ------------------------------------ |
| teo       | 11      | 35     | 271 (PR #1), 281 (PR #2) — în review |
| Casian    | 10      | 38     | —                                    |
| **Rămân** | **19**  | **69** |                                      |

## 3. Ce intră în sprint

### Nivel A — drumul până la staging (obligatoriu, 34 SP)

| Tichet  | Ce                                                                                                                 | SP  | Depinde de                    |
| ------- | ------------------------------------------------------------------------------------------------------------------ | --- | ----------------------------- |
| 272 F02 | Inițializare repo: TS strict, alias `@/`, structură `features/`, ESLint + Prettier + Husky, `.env.example`, README | 3   | —                             |
| 273 F03 | Tailwind + shadcn                                                                                                  | 2   | 272                           |
| 275 F05 | Router + layout-uri (Public / Auth / Cursant / Mentor), 404, lazy loading                                          | 3   | 272                           |
| 276 F06 | Client API + TanStack Query + tipuri din OpenAPI                                                                   | 5   | 272                           |
| 274 F04 | Temă din moodboard + componente de bază + `/styleguide`                                                            | 5   | 273                           |
| 283 F13 | Mock API cu MSW                                                                                                    | 3   | 276                           |
| 284 F14 | Teste: Testing Library + MSW + Playwright smoke                                                                    | 5   | 283                           |
| 285 F15 | CI pe fiecare PR (GitHub Actions)                                                                                  | 3   | 284                           |
| 286 F16 | Deploy pe Vercel (staging) + `vercel.json`                                                                         | 5   | 285 + importul făcut de David |

### Nivel B — autentificare, formulare, stări (obligatoriu, 16 SP)

| Tichet  | Ce                                                | SP  | Depinde de |
| ------- | ------------------------------------------------- | --- | ---------- |
| 279 F09 | Formulare (RHF + Zod) + upload de fișiere         | 3   | 274        |
| 280 F10 | Stări comune: loading, gol, eroare, ErrorBoundary | 2   | 274, 276   |
| 277 F07 | Context de autentificare (pe mock până vine BE)   | 8   | 275, 276   |
| 278 F08 | Route guards + revenire la acțiunea întreruptă    | 3   | 277        |

### Nivel C — propus pentru Sprint 3 (19 SP)

| Tichet  | Ce                                           | SP  | De ce îl mutăm                                                        |
| ------- | -------------------------------------------- | --- | --------------------------------------------------------------------- |
| 282 F12 | i18n                                         | 2   | Contrazice documentul (§3: „fără framework i18n”). Întâi decide PO-ul |
| 287 F17 | Sentry + analytics                           | 3   | Depinde de 285, 288 și de un cont Sentry                              |
| 288 F18 | Cookie consent + Termeni / Confidențialitate | 3   | Textele legale vin de la PO / jurist                                  |
| 289 F19 | Accesibilitate, responsive, SEO              | 3   | Are sens după ce există primele ecrane                                |
| 290 G1  | Landing page                                 | 5   | E un ecran; sprintul e despre fundație                                |
| 291 G2  | Mentorat vs. meditații + FAQ                 | 3   | Idem                                                                  |

**Total în sprint: 50 SP** (nivelurile A + B) în 9 zile, adică ~5,5 SP pe zi. Dacă o zi
alunecă, primul care iese din sprint e 279, apoi 278.

## 4. Ordinea pe zile

Un singur „fir” de lucru, în ordinea lanțului critic. **Un tichet = un branch = un PR**, gata de merge (fără conflicte). Dacă un PR depinde de altul, se
construiește peste el, iar ordinea de merge se scrie în descriere.

| Zi        | Tichete                 | SP  | La final de zi                                  |
| --------- | ----------------------- | --- | ----------------------------------------------- |
| **Lu 9**  | 272 · merge PR #1 și #2 | 3   | Repo inițializat; trimitem lista de cereri (§6) |
| **Ma 10** | 273 · 275               | 5   | Tailwind + shadcn; rutele și layout-urile merg  |
| **Mi 11** | 276                     | 5   | Client API + TanStack Query                     |
| **Jo 12** | 274                     | 5   | Tema Mentorly + componente + `/styleguide`      |
| **Vi 13** | 283 · 279               | 6   | Mock API; formulare și upload                   |
| **Lu 16** | 284 · 280               | 7   | Teste complete; stări loading / gol / eroare    |
| **Ma 17** | 285 · 286               | 8   | CI pe PR-uri; **staging live pe Vercel**        |
| **Mi 18** | 277                     | 8   | Login / logout / sesiune (pe mock)              |
| **Jo 19** | 278 · demo              | 3   | Route guards; demo pe staging la review         |

## 5. Cum lucrăm pe fiecare tichet

1. Muți tichetul în **In Progress** în Jira.
2. Branch `feature/SCRUM-XX-...` din `main`.
3. Întâi testele, apoi codul.
4. Lint + typecheck + teste + build trec local.
5. Review cu `code-reviewer`.
6. PR → Casian face review → merge în aceeași zi → tichetul în **Done**.

## 6. Mesaje de trimis (scurte)

**Luni, pe grup (o singură listă):**

> Plan FE Sprint 2: fac eu fundația FE (inclusiv tichetele lui Casian), Casian face review. Casian, ești ok? Dacă da, le realoc pe mine în Jira.
> Am nevoie de:
>
> 1. **David:** import repo în Vercel (până marți 17) + branch protection pe `main`.
> 2. **David / Ioan:** cookie sau token pentru sesiune? Când avem Swagger? Sumele în bani (întregi), datele ISO cu `Z`.
> 3. **Anca:** avem Figma? Propun să mutăm 282, 287–291 în Sprint 3 (fundația are prioritate). i18n: îl vrem sau nu (documentul spune că nu)?

**Zilnic, la Daily (3 rânduri):** ce am terminat ieri · ce fac azi · ce mă blochează.

## 7. Riscuri

| Risc                                                 | Ce facem                                                                               |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Lanțul critic alunecă o zi (de ex. review întârziat) | Merge în aceeași zi; 279 și 278 ies primele din sprint                                 |
| Casian nu e de acord să-i preluăm tichetele          | Revenim la „el lucrează, noi facem review”, iar planul pe zile se împarte în două fire |
| David nu face importul în Vercel la timp             | 286 rămâne cu `vercel.json` gata; deploy-ul imediat după import                        |
| BE nu are contract API                               | Tot ce ține de API rulează pe MSW; tipurile se regenerează când apare Swagger          |
| Strategia de sesiune nu e decisă                     | 277 se scrie în spatele unei interfețe; cookie sau token se schimbă într-un singur loc |
| Conflicte în `package.json`                          | Un singur fir de lucru, iar fiecare PR se face din `main` după merge-ul anterior       |

## 8. Ce înseamnă „sprint reușit”

- Staging live pe Vercel, cu preview pe fiecare PR.
- CI verde pe fiecare PR: lint, typecheck, teste, build.
- Login / logout pe mock, cu rute protejate pe rol.
- Tema Mentorly și componentele de bază vizibile pe `/styleguide`.
- Nivelul C mutat oficial în Sprint 3, nu lăsat neterminat.
