# Reguli de lucru — Mentorly (propunere)

Scurte, ca să le citim pe toate. Se aplică FE și BE.

## 1. Un tichet = un branch = un PR

- Branch `feature/SCRUM-XX-descriere`, **un singur PR pe tichet**.
- **PR mic:** cât mai puțin cod și cât mai puține fișiere. `package-lock.json` e marcat ca
  generat, deci GitHub îl ascunde din review.
- **Gata de merge:** fără conflicte cu `main` sau cu celelalte PR-uri deschise; lint,
  typecheck, teste și build trec.
- Dacă un PR depinde de altul, baza lui e branch-ul acelui PR, iar ordinea de merge se
  scrie în descriere.

## 2. Fișiere mici

- **Componentele înrudite stau împreună** (de ex. toate layout-urile într-un fișier); fără fișiere de 5 linii.
- **Maxim ~200 de linii pe fișier.** Peste, se împarte.
- Funcțiile: maxim ~50 de linii.

## 3. Review

- **Review în aceeași zi** în care e cerut. Dacă nu ai timp, spune pe grup.
- Descrierea PR-ului: **ce face, cum se testează, ce rămâne**, în cel mult 5 rânduri.
- Fără merge fără review. După merge: **„Delete branch”**.

## 4. Commit-uri și branch-uri

- Branch: `feature/SCRUM-XX-descriere-scurta`.
- Commit: `feat: descriere cu literă mică (SCRUM-XX)` (verificat automat).

## 5. Comunicare

- Pe grup: **problema sau decizia, direct, în câteva rânduri**.
