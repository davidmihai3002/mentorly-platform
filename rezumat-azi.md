Salut! Ce am făcut azi pe FE (Mentorly), totul după Figma, doar UI:

- **PR #16 – Faza A (merged):** fontul Roboto, culorile din Figma, bara de sus albă, footerul, fundalul și componentele comune (card de mentor, badge-uri, opțiuni de quiz).
- **PR #17 – Autentificare (merged):** am scos „minim 16 ani” și am pus 2 linkuri de înregistrare (cursant / mentor). Plus înscriere mentor cu documente (LinkedIn, CV PDF), parolă uitată, resetare parolă și deconectare cu mesaj.
- **PR #18 – Faza B, landing (merged):** pagina de start (hero) plus paginile Ce este Mentorly, Comunitate Q&A, Recenzii și Parteneri. Linkurile din bara de sus duc la ele, iar pagina curentă apare subliniată.
- **PR #19 – Faza C, quiz (merged):** quiz-ul de potrivire în 4 pași, Top 3 mentori recomandați (cu „De ce vă potriviți”) și Top Mentori cu filtru pe domeniu. Răspunsurile rămân în link.
- **Jira:** SCRUM-296, 297, 290, 291, 298, 299 + 292, 293, 301, 303, 305, 308, 310, 311, 312, 314 sunt pe Done, cu link spre PR (doar partea de FE).
- **PR #22 – Dashboard mentor (deschis, așteaptă CI + merge):** pagina /mentor după ecranul 17 din Figma (indicatori, grafic câștiguri, sesiuni, săptămâna, cursanții), cu capturi în PR. Restul ecranelor de mentor nu au design în Figma încă.
- **PR #21 – Profil cursant (merged):** pagina /cursant după Figma + editare profil (doar UI), cu capturi de ecran în PR.
- **PR #20 – Faza D, contul de cursant (deschis, așteaptă CI + merge):** gata sunt căutarea mentorilor (filtre, sortare, grid/listă), profilul public al mentorului (preț, capacitate, disponibilitate, recenzii, aplicare + test de admitere) și rezervarea cap-coadă (calendar → sumar → plată fără Stripe real → confirmare → reprogramare). Plus recenziile detaliate, „Scrie o recenzie” și Proiectele mele (predare + feedback). E în review; profilul cursantului vine separat, după ce primim linkul din Figma.
- **De la design:** numele reale ale partenerilor (acum sunt X/Y/Z), plus ilustrația din hero și avatarele ca imagini exportate.
- **De la David:** branch protection pe `main`.
