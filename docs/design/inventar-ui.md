# Inventar UI — tokens, componente și ecrane

| | |
| --- | --- |
| **Sursa de design** | Moodboard provizoriu ([`moodboard.webp`](moodboard.webp)). UI kit Figma: **de confirmat** (vezi [ADR 0001](../adr/0001-stack-frontend.md#decizia-4--sursa-de-design)) |
| **Tichet** | [SCRUM-271 · FE-F01](https://ancadrehluta.atlassian.net/browse/SCRUM-271) |
| **Folosit de** | SCRUM-273 (F03), SCRUM-274 (F04), SCRUM-289 (F19) și toate ecranele |
| **Actualizat** | 2026-11-07 |

> Dacă apare un fișier Figma, el are prioritate. Acest document se actualizează atunci.

## 1. Atenționări despre moodboard

- **Textele din imagine sunt generate automat și nu au sens** („Numel Mentor”, „Texte de paragraf
  pensrinantai…”). Copy-ul vine din documentul de cerințe și din tichete, nu din imagine.
- **„Peste 10.000 de mentees” este un exemplu, nu o cifră reală.** Nu o publicăm (ar fi o
  afirmație falsă pe landing).
- **Logo-urile Microsoft, Samsung, Apple** sunt doar ilustrative. Pe landing apar doar
  sponsorii reali, cu logo-urile primite de la ei (SCRUM-233 / SCRUM-290).
- Pozele de stoc sunt doar de atmosferă; pozele reale sunt ale mentorilor.

## 2. Tokens

### Culori

| Rol | Hex | Utilizare |
| --- | --- | --- |
| Primar | `#2563EB` | Butoane principale, linkuri, focus, stări active |
| Secundar (indigo) | `#4F46E5` | Accente, elemente secundare de brand |
| Succes | `#10B981` | Iconițe și indicatoare („Disponibil azi”, punctul verde) |
| Fundal | `#F9FAFB` | Fundalul paginilor |
| Text | `#1E293B` | Text principal, titluri |
| Suprafață | `#FFFFFF` | Carduri, dialoguri |
| Rating | galben-auriu (stelele din moodboard) | Doar pentru stele; valoarea exactă se stabilește în F04 |

### Contrast (WCAG 2.1, calculat pe 2026-11-07)

| Combinație | Raport | AA text normal (≥ 4.5) |
| --- | --- | --- |
| alb pe `#2563EB` (buton primar) | 5.17 : 1 | ✅ |
| alb pe `#4F46E5` | 6.29 : 1 | ✅ |
| `#1E293B` pe `#F9FAFB` (text pe fundal) | 14.0 : 1 | ✅ |
| `#2563EB` pe `#F9FAFB` (link pe fundal) | 4.95 : 1 | ✅ |
| **alb pe `#10B981`** | **2.54 : 1** | ❌ |
| **`#10B981` pe alb (ca text)** | **2.54 : 1** | ❌ |
| `#047857` pe `#D1FAE5` (badge verde) | 4.84 : 1 | ✅ |

**Regulă:** verdele `#10B981` nu se folosește nici ca fundal pentru text alb, nici ca
text. Badge-ul „Disponibil azi” se face cu **text `#047857` pe fundal `#D1FAE5`**, cu
punctul `#10B981` ca element decorativ. Așa arată de fapt și în moodboard.

### Tipografie

| Rol | Font | Unde |
| --- | --- | --- |
| Titluri (H1–H3, cifre mari) | **Plus Jakarta Sans** (bold / extrabold) | „Găsește mentorul potrivit”, titluri de secțiune |
| Text, UI, formulare | **Inter** | Paragrafe, butoane, câmpuri, carduri |

- Fonturile trebuie să aibă diacriticele românești (ș, ț, ă, î, â). Ambele le au.
- Le servim din bundle (de ex. pachetele `@fontsource-variable/*`), nu de pe Google Fonts
  CDN. Așa nu trimitem IP-ul utilizatorilor la un terț înainte de consimțământ (GDPR,
  SCRUM-288). Decizia finală se ia în SCRUM-274.

### Forme și elevație (din moodboard)

- Carduri: colțuri mari (aprox. `rounded-2xl`), fundal alb, umbră fină.
- Butoane primare: colțuri rotunjite (aprox. `rounded-xl`), lățime generoasă.
- Badge-uri și chips (skill-uri): formă de pastilă (`rounded-full`), fundal deschis, text
  colorat.
- Iconițe: liniare, culoarea primară, în containere albe pătrate cu colțuri rotunjite.
  shadcn folosește implicit `lucide-react`, iar stilul acesta se potrivește.

## 3. Componente

### 3.1 Din shadcn/ui

| Componentă | Folosită în (exemple) |
| --- | --- |
| Button, Input, Textarea, Label | peste tot |
| Select, Checkbox, RadioGroup, Switch | formulare, filtre, tipul de cont, opțiuni de preț |
| Form / Field (integrare RHF) | toate formularele (SCRUM-279) |
| Card | carduri de mentor, dashboard-uri |
| Badge | Test, sponsor, status aplicare, „nou” |
| Avatar | mentor, cursant |
| Dialog, AlertDialog | confirmări (încheie mentoratul, respinge aplicarea) |
| Sheet | filtrele și meniul pe mobil |
| DropdownMenu | meniul de cont, logout |
| Tabs | dashboard-uri, profil |
| Accordion | FAQ (SCRUM-291) |
| Tooltip, Popover | explicații scurte, selector de dată |
| Skeleton | stări de loading (SCRUM-280) |
| Toast (Sonner) | erori API, confirmări |
| Pagination | căutare |
| Slider | filtrul de interval de preț |
| Progress | upload de fișiere |
| Table | istoric plăți, aplicări primite |
| Chart | graficul de câștiguri (SCRUM-333) |
| Separator | layout |

### 3.2 Componente proprii (de domeniu)

| Componentă | Ce face | Tichet |
| --- | --- | --- |
| `MentorCard` | poză, nume, rol, domeniu, preț, rating, badge-uri, chips | SCRUM-292 |
| `RatingStars` | afișare (cu jumătăți) și introducere 1–5 | SCRUM-293, SCRUM-311 |
| `PriceTag` | preț în RON, per ședință și/sau lunar, discount | SCRUM-293, SCRUM-323 |
| `TestBadge`, `SponsorBadge`, `NewMentorBadge` | badge-uri de pe card și profil | SCRUM-292, SCRUM-325 |
| `ApplicationStatusBadge` | În așteptare / Acceptată / Respinsă | SCRUM-302, SCRUM-327 |
| `FileUpload` | tip și mărime validate, progres, înlocuire | SCRUM-279 |
| `EmptyState`, `ErrorState` | stări goale și de eroare cu retry | SCRUM-280 |
| `WeeklySlotPicker` | alegerea unui interval liber din săptămâna mentorului | SCRUM-303 |
| `WeeklyAvailabilityEditor` | editarea intervalelor recurente ale mentorului | SCRUM-324 |
| `SessionItem` | ședință cu link Meet, export .ics, reprogramare | SCRUM-309, SCRUM-329 |
| `GroupLinkButton` | „Intră în grup”, link extern validat | SCRUM-307 |
| `NotificationBell` | clopoțel cu contor + listă | SCRUM-315 |
| `EarningsChart` | câștiguri pe 1 / 3 / 6 / 12 luni | SCRUM-333 |

## 4. Ecrane

Coloana **Cine** reflectă alocarea din Jira pe 2026-11-07.

### Public (guest)

| Ecran | Tichet | Cine |
| --- | --- | --- |
| Landing page | SCRUM-290 (G1) | Casian |
| Mentorat vs. meditații + FAQ | SCRUM-291 (G2) | teo |
| Căutare mentori | SCRUM-292 (G3) | Casian |
| Profil public mentor | SCRUM-293 (G4) | teo |
| Pagina sponsorului | SCRUM-294 (G5) | Casian |
| Înregistrare cursant | SCRUM-295 (G6) | teo |
| Înregistrare mentor | SCRUM-296 (G7) | Casian |
| Login, logout, parolă uitată | SCRUM-297 (G8) | teo |
| Termeni, Confidențialitate, banner cookies | SCRUM-288 (F18) | Casian |
| 404 | SCRUM-275 (F05) | teo |

### Cursant

| Ecran | Tichet | Cine |
| --- | --- | --- |
| Onboarding + formular de matching | SCRUM-298 (C1) | Casian |
| Top 3 mentori (în dashboard) | SCRUM-299 (C2) | teo |
| Favorite | SCRUM-300 (C3) | Casian |
| Aplicare la un mentorat | SCRUM-301 (C4) | teo |
| Aplicările mele | SCRUM-302 (C5) | Casian |
| Call gratuit introductiv | SCRUM-304 (C7) | Casian |
| Înrolare + plată per ședință | SCRUM-305 (C8) | teo |
| Înrolare + abonament lunar | SCRUM-306 (C9) | Casian |
| Programare ședință | SCRUM-308 (S1) | Casian |
| Ședințe următoare | SCRUM-309 (S2) | teo |
| Recenzie detaliată | SCRUM-312 (S5) | Casian |
| Progres: evaluări, ședințe, obiective | SCRUM-313 (S6) | teo |
| Proiecte | SCRUM-314 (S7) | Casian |
| Dashboard cursant | SCRUM-316 (S9) | Casian |
| Aplicare la programul sponsorizat | SCRUM-317 (S10) | teo |
| Setări cont | SCRUM-319 (S12) | teo |

### Mentor

| Ecran | Tichet | Cine |
| --- | --- | --- |
| Aplicare de mentor | SCRUM-320 (M1) | Casian |
| Stare cont PENDING / APPROVED / REJECTED | SCRUM-321 (M2) | teo |
| Editare profil | SCRUM-322 (M3) | Casian |
| Configurare mentorat + prețuri | SCRUM-323 (M4) | teo |
| Disponibilitate săptămânală | SCRUM-324 (M5) | Casian |
| Întrebări, test, materiale | SCRUM-325 (M6) | teo |
| Onboarding Stripe Connect | SCRUM-326 (M7) | Casian |
| Aplicări primite | SCRUM-327 (M8) | teo |
| Cursanți înrolați + fișa cursantului | SCRUM-328 (M9) | Casian |
| Ședințele mentorului | SCRUM-329 (M10) | teo |
| Evaluări | SCRUM-330 (M11) | Casian |
| Proiecte (mentor) | SCRUM-331 (M12) | teo |
| Obiective | SCRUM-332 (M13) | Casian |
| Câștiguri + grafic | SCRUM-333 (M14) | teo |
| Reputație | SCRUM-334 (M15) | Casian |

### Comune

| Ecran / element | Tichet | Cine |
| --- | --- | --- |
| Layout-uri Public / Auth / Cursant / Mentor, header, meniu de cont | SCRUM-275 (F05) | teo |
| Centru de notificări | SCRUM-315 (S8) | teo |
| Pagină `/styleguide` (doar în dev) | SCRUM-274 (F04) | Casian |
