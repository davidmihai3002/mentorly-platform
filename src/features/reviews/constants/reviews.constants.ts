import type { CriterionId, DetailedReview, ReviewFilterId, ReviewSortId } from '../types'

export const CRITERIA: readonly {
  readonly id: CriterionId
  readonly label: string
  readonly short: string
}[] = [
  { id: 'clarity', label: 'Claritatea explicațiilor', short: 'Claritate' },
  { id: 'empathy', label: 'Empatie și răbdare', short: 'Empatie' },
  { id: 'structure', label: 'Structura sesiunii', short: 'Structură' },
  { id: 'usefulness', label: 'Utilitatea feedbackului', short: 'Utilitate' },
]

export const REVIEWS_PAGE_TEXT = {
  pageTitle: (name: string) => `Recenzii ${name} – Mentorly`,
  title: (firstName: string) => `Ce spun cursanții despre ${firstName}`,
  subtitle: 'Recenzii din sesiuni finalizate.',
  ratingSuffix: '/ 5',
  reviewCount: (count: number) => `${count} de recenzii`,
  writeReview: 'Scrie o recenzie',
  filtersLabel: 'Filtrează recenziile',
  filters: { all: 'Toate', '5': '5 stele', '4': '4 stele' } satisfies Record<
    ReviewFilterId,
    string
  >,
  sortLabel: 'Ordonează recenziile',
  sorts: { recent: 'Cele mai recente', helpful: 'Cele mai utile' } satisfies Record<
    ReviewSortId,
    string
  >,
  finished: 'Sesiune finalizată',
  meta: 'Mentorat Frontend · Recenzie ilustrativă',
  helpful: (count: number) => `Utilă? Da (${count})`,
  loadMore: 'Încarcă mai multe recenzii',
  empty: 'Nu există recenzii pentru acest filtru.',
  published: 'Recenzia ta a fost publicată. Mulțumim pentru feedback!',
  shown: (shown: number, total: number) => `${shown} din ${total} recenzii afișate`,
} as const

export const WRITE_REVIEW_TEXT = {
  pageTitle: 'Scrie o recenzie – Mentorly',
  title: 'Cum a fost experiența ta?',
  subtitle: 'Feedbackul tău îi ajută pe alți cursanți să aleagă informat.',
  badge: 'Sesiune finalizată · Recenzie verificabilă',
  session: 'Sesiune din 19 noiembrie 2026 · 60 de minute',
  overallLegend: 'Evaluarea ta generală',
  criteriaTitle: 'Evaluează experiența pe criterii',
  commentLabel: 'Comentariul tău',
  commentPlaceholder:
    'Mi-a plăcut că am discutat pe proiectul meu și am înțeles de ce merită separate responsabilitățile componentelor.',
  commentHint:
    'Minimum 30 de caractere · Povestește concret ce te-a ajutat și ce poate fi îmbunătățit.',
  consent: 'Sunt de acord ca recenzia și numele meu afișat să apară pe profilul mentorului.',
  cancel: 'Renunță',
  publish: 'Publică recenzia',
  required: '*',
  starLabel: (value: number) => (value === 1 ? '1 stea' : `${value} stele`),
  ratingSummary: (value: number, label: string) => `${value} din 5 · ${label}`,
  ratingWords: ['', 'Slab', 'Acceptabil', 'Bine', 'Foarte bine', 'Excelent'],
  ratingRequired: 'Alege o notă de la 1 la 5.',
  commentTooShort: 'Scrie cel puțin 30 de caractere.',
  commentTooLong: 'Comentariul poate avea cel mult 1000 de caractere.',
  consentRequired: 'Confirmă că recenzia poate fi afișată.',
} as const

export const REVIEW_LIMITS = { minComment: 30, maxComment: 1000, maxStars: 5, pageSize: 2 } as const

export const SAMPLE_REVIEWS: readonly DetailedReview[] = [
  {
    id: 'radu',
    author: 'Radu S.',
    date: 'Noiembrie 2026',
    sortKey: 20261120,
    rating: 5,
    text: 'Mihai m-a ajutat să trec de la tutoriale la idei. Explică pe înțeles și am plecat cu pași concreți.',
    scores: { clarity: 5, empathy: 5, structure: 5, usefulness: 5 },
    helpfulCount: 3,
  },
  {
    id: 'irina',
    author: 'Irina T.',
    date: 'Noiembrie 2026',
    sortKey: 20261112,
    rating: 5,
    text: 'Feedback pe codul meu, oferit clar și răbdător. Acum pot explica singură alegerile de arhitectură.',
    scores: { clarity: 5, empathy: 5, structure: 5, usefulness: 5 },
    helpfulCount: 3,
  },
  {
    id: 'andrei',
    author: 'Andrei M.',
    date: 'Octombrie 2026',
    sortKey: 20261021,
    rating: 4,
    text: 'Sesiuni bine structurate. Aș fi vrut puțin mai mult timp pentru întrebări, dar am progresat vizibil.',
    scores: { clarity: 5, empathy: 4, structure: 4, usefulness: 4 },
    helpfulCount: 5,
  },
  {
    id: 'diana',
    author: 'Diana C.',
    date: 'Octombrie 2026',
    sortKey: 20261009,
    rating: 5,
    text: 'Am primit un plan realist pentru interviuri și feedback concret pe portofoliu.',
    scores: { clarity: 5, empathy: 5, structure: 5, usefulness: 5 },
    helpfulCount: 2,
  },
  {
    id: 'vlad',
    author: 'Vlad P.',
    date: 'Septembrie 2026',
    sortKey: 20260918,
    rating: 4,
    text: 'Explicații clare despre testare. Temele dintre sesiuni m-au ținut în ritm.',
    scores: { clarity: 4, empathy: 5, structure: 4, usefulness: 5 },
    helpfulCount: 1,
  },
]

export const SUMMARY_SCORES: Readonly<Record<CriterionId, number>> = {
  clarity: 5,
  empathy: 4.9,
  structure: 4.9,
  usefulness: 4.9,
}

export const UNAVAILABLE_TEXT = {
  title: 'Mentorul nu a fost găsit',
  text: 'Linkul poate fi greșit sau profilul a fost mutat.',
  back: 'Înapoi la căutare',
} as const
