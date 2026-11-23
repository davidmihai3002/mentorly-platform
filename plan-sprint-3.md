# Plan FE (doar UI) — teo implementează tot, inclusiv tichetele lui Casian

**Actualizat:** 22 noiembrie 2026 · **Surse:** Jira SCRUM, Figma „Mentorly” (~30 de ecrane), `main` la #15

## 0. Decizii (stabilite de teo)

1. **Tot ce e pe numele lui Casian implementăm noi** (landing, FAQ, quiz, top 3, favorite, proiecte cursant, calendar etc.).
2. **Figma e corect și complet.** Îl urmăm exact, inclusiv bara de sus albă.
3. **1 fază = 1 branch = 1 PR.** Fiecare fază e spartă în subpași mici, fiecare cu scopul lui și cu commit-ul lui.
4. **Merge-ul îl dăm noi**, în ordinea: PR deschis → CI verde → code review complet → reparații → merge → Jira la zi.
5. **Doar UI.** Fără backend: butoanele fac `console.log` doar în dev, cu parola mascată, iar datele sunt fixe, în `constants/`.

## 1. Regulile codului (neschimbate)

- O componentă per fișier, mică și refolosibilă. Logica stă în `.ts` (`utils/`, `hooks/`). `index.ts` în fiecare folder.
- Fără comentarii, fără teste, fără `any`. shadcn se copiază manual (Base UI). Nu modificăm `components/ui`.
- Culori și spațieri doar din tokens (`index.css`). Animații doar din `motion.css`.
- Rutele în română, linkurile interne prin `AppLink` (au tranziții).

## 2. Fluxul pe fiecare fază

| Moment            | Ce facem                                                                                                                                                                                                                                                                  | Unelte                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Înainte           | Citesc tichetele din Jira și ecranele din Figma (prototip după `node-id` + panoul Properties). `graphify update .` + `graphify query`/`affected`. Întrebări cu variante [RECOMANDAT].                                                                                     | `prompt.md`, `/plan`, browser, **graphify** (safe mode)                                                                                |
| Branch            | `git switch main && git pull --rebase` → `feature/<faza>`                                                                                                                                                                                                                 | `git-workflow`                                                                                                                         |
| Pe fiecare subpas | implementez → lint / typecheck / build → verific în browser la 360 / 768 / 1280 → commit                                                                                                                                                                                  | `Frontend Developer`, `Minimal Change Engineer`, `wshobson-tailwind-design-system`, `wshobson-responsive-design`, `Evidence Collector` |
| PR                | trial merge + capturi + video demo → push + PR spre `main` (cu OK-ul lui teo) → CI                                                                                                                                                                                        | `Git Workflow Master`, `/pr`                                                                                                           |
| Code review pe PR | R1 verificări automate · R2 script pentru regulile echipei · R3 `Code Reviewer` + `typescript-reviewer` + `react-specialist` · R4 `UI Finish-Gate Reviewer` (față de Figma) + `Accessibility Auditor` + `wshobson-ui-visual-validator` · R5 `Reality Checker` · R6 raport |                                                                                                                                        |
| După review       | reparații (commit nou în același PR) → CI verde → **merge** → Jira: statusurile + comentariu cu link                                                                                                                                                                      |                                                                                                                                        |

## 3. Fazele, în ordinea firească a implementării

Ordinea: întâi ce apare pe toate ecranele (bara de sus, componentele), apoi ce vede un vizitator (landing), apoi ce face după înscriere (quiz), apoi contul de cursant de la căutare la plată, apoi contul de mentor.

### Faza A — Alinierea la Figma și componentele comune · PR 1

**Tichete:** 275, 289, 295, 297, 274 (componente) · **Ecrane:** Acasă (bara de sus), Autentificare cursant, Înscriere cursant, 08 · Specialități și componente

| Subpas | Ce                                                                                                  | Scop                                      |
| ------ | --------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| A1     | Tokens din Figma: culori, umbre, raze, fundal #F6F8F9                                               | Toate ecranele folosesc aceleași valori   |
| A2     | Bara de sus albă pentru vizitatori (logo, linkuri, Autentificare, Înregistrare) + meniul ☰ adaptat | Arată ca în Figma peste tot               |
| A3     | Bara de sus pentru utilizatorul logat (linkuri + „Contul meu” + „Deconectare”)                      | Pregătește conturile de cursant și mentor |
| A4     | Subsolul + fundalul paginilor (valuri albastre + grilă)                                             | Fundalul comun din Figma                  |
| A5     | Login aliniat: titlu, texte, spațieri                                                               | Pagina corespunde exact cu Figma          |
| A6     | Signup aliniat                                                                                      | La fel                                    |
| A7     | Componente: chip pentru specialitate, rating cu stele, badge                                        | Piese mici refolosite peste tot           |
| A8     | Card mentor în 2 variante (grid și listă)                                                           | Folosit în landing, top 3, căutare        |
| A9     | Butoane, selecții și câmpuri din „Acțiuni și selecții”                                              | Folosite în quiz, filtre, rezervare       |

### Faza B — Landing și paginile publice · PR 2

**Tichete:** 290, 291 · **Ecrane:** Acasă, Ce este Mentorly, Recenzii, Parteneri, Conținut

| Subpas | Ce                                                                    | Scop                  |
| ------ | --------------------------------------------------------------------- | --------------------- |
| B1     | Ruta `/` arată landing-ul (în loc de redirect)                        | Pagina de start reală |
| B2     | Hero: titlu, text, „Găsește-ți mentorul”, „Devino mentor”, ilustrație | Prima impresie        |
| B3     | „De ce mentorat și nu meditații?” (3 carduri)                         | Explică valoarea      |
| B4     | „Povești de succes” (recenzii)                                        | Încredere             |
| B5     | Parteneri (logo-uri + text)                                           | Sponsorii             |
| B6     | Comunitate Q&A / Conținut                                             | Întrebări frecvente   |
| B7     | Linkurile din bara de sus duc la secțiuni (ancore)                    | Navigarea pe landing  |

### Faza C — Quiz-ul de potrivire și recomandările · PR 3

**Tichete:** 298, 299 · **Ecrane:** 02–07 Quiz, 01 Top Mentori

| Subpas | Ce                                                              | Scop                      |
| ------ | --------------------------------------------------------------- | ------------------------- |
| C1     | Starea quiz-ului: pași, răspunsuri, Înapoi / Continuă (un hook) | Logica separată de ecrane |
| C2     | Intro („Mentorul potrivit începe cu tine”) + bara de progres    | Intrarea în quiz          |
| C3     | Pasul Obiectiv                                                  | Primul răspuns            |
| C4     | Pasul Nivel                                                     |                           |
| C5     | Pasul Domeniu (+ interese, selecție multiplă)                   |                           |
| C6     | Pasul Ritm                                                      |                           |
| C7     | Top 3 recomandați (cu motivele potrivirii)                      | Rezultatul quiz-ului      |
| C8     | Top Mentori (lista completă)                                    | Explorare după quiz       |

### Faza D — Contul de cursant · PR 4

**Tichete:** 292, 293, 300, 301, 303, 305, 308, 310, 311, 312, 314, 316, 319 · **Ecrane:** 09–16, 18–20, Profil mentor, Profil cursant, Proiecte

| Subpas | Ce                                                                           | Scop                  |
| ------ | ---------------------------------------------------------------------------- | --------------------- |
| D1     | Căutare mentori: grid + listă + comutare                                     | Găsește un mentor     |
| D2     | Filtre și sortare (doar UI)                                                  | Rafinarea căutării    |
| D3     | Favorite (inimă pe card)                                                     | Salvează mentori      |
| D4     | Profilul public al mentorului: detalii, prețuri, capacitate, disponibilitate | Decizia de a aplica   |
| D5     | Recenzii detaliate pe profil                                                 | Încredere             |
| D6     | Calendar și rezervare (alege intervalul)                                     | Programarea ședinței  |
| D7     | Sumar comandă → Checkout → Plată reușită (fără Stripe real)                  | Fluxul de plată       |
| D8     | Reprogramare + confirmare                                                    | Schimbarea ședinței   |
| D9     | Proiectele mele + feedback                                                   | Lucrul cu mentorul    |
| D10    | Scrie o recenzie                                                             | După ședință          |
| D11    | Profil și setări cursant                                                     | Contul personal       |
| D12    | Rutele de cont: `/cursant/...` + legăturile dintre ecrane                    | Totul legat cap-coadă |

### Faza E — Contul de mentor · PR 5

**Tichete:** 296, 320–333 (partea de UI) · **Ecrane:** Autentificare și înscriere mentor, 17 · Dashboard mentor, 18, Profil mentor (editare), fluxurile „Prototip · …”

| Subpas | Ce                                                          | Scop                           |
| ------ | ----------------------------------------------------------- | ------------------------------ |
| E1     | Autentificare + înscriere mentor                            | Intrarea mentorului            |
| E2     | Aplicarea de mentor + stările PENDING / APPROVED / REJECTED | După înscriere                 |
| E3     | Dashboard mentor                                            | Pagina principală a mentorului |
| E4     | Editare profil + configurare mentorat și prețuri            | Ce văd cursanții               |
| E5     | Disponibilitate (calendar săptămânal)                       | Când poate fi rezervat         |
| E6     | Aplicări primite: listă + decizie                           | Acceptă cursanți               |
| E7     | Ședințele mentorului + proiecte și feedback                 | Lucrul cu cursanții            |
| E8     | Câștiguri (cu grafic)                                       | Partea financiară              |
| E9     | Rutele `/mentor/...` + legăturile dintre ecrane             | Totul legat cap-coadă          |

## 4. De cerut echipei

- **David:** branch protection pe `main` cu check-ul `ci` (ca merge-ul nostru să fie blocat dacă pică CI-ul).
- **Opțional:** „can edit” în Figma pentru conectorul MCP. Nu e obligatoriu, citim din browser.
