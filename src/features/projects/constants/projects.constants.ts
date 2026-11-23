import type { Project, ProjectFilterId, ProjectStatus } from '../types'

export const PROJECTS_TEXT = {
  pageTitle: 'Proiectele mele – Mentorly',
  title: 'Proiectele mele',
  subtitle: 'Aplică ce înveți și construiește-ți portofoliul, pas cu pas.',
  filtersLabel: 'Filtrează proiectele',
  filters: {
    all: 'Toate',
    'in-progress': 'În lucru',
    submitted: 'Predate',
    done: 'Finalizate',
  } satisfies Record<ProjectFilterId, string>,
  status: { 'in-progress': 'În lucru', submitted: 'Predat', done: 'Finalizat' } satisfies Record<
    ProjectStatus,
    string
  >,
  progress: (done: number, total: number) => `${done} din ${total} etape finalizate`,
  progressLabel: 'Progresul proiectului',
  stagesLabel: 'Etapele proiectului',
  stageDone: 'finalizată',
  stagePending: 'în așteptare',
  submitTitle: 'Trimite versiunea pentru feedback',
  repoLabel: 'Link proiect / repository',
  repoPlaceholder: 'https://github.com/andreea-marin-demo/reading-app',
  fileHint: 'Trage fișiere aici · PDF / ZIP, maximum 20 MB',
  uploadFile: 'Încarcă fișier',
  removeFile: 'Elimină fișierul',
  messageLabel: 'Mesaj pentru mentor',
  messagePlaceholder: 'Am integrat API-ul. Aș aprecia feedback pe tratarea erorilor.',
  submit: 'Predă proiectul',
  submitted:
    'Versiunea a fost trimisă. Mentorul primește o notificare și îți răspunde în spațiul proiectului.',
  needSource: 'Adaugă un link sau un fișier ca să poți preda proiectul.',
  invalidUrl: 'Linkul trebuie să înceapă cu https://.',
  fileType: 'Fișierul trebuie să fie PDF sau ZIP.',
  fileSize: 'Fișierul poate avea cel mult 20 MB.',
  fileEmpty: 'Fișierul este gol.',
  messageTooLong: 'Mesajul poate avea cel mult 1000 de caractere.',
  viewFeedback: 'Vezi feedbackul',
  empty: 'Nu ai proiecte în această categorie.',
} as const

export const PROJECT_FILE = {
  accept: '.pdf,.zip,application/pdf,application/zip',
  maxBytes: 20 * 1024 * 1024,
  types: ['application/pdf', 'application/zip', 'application/x-zip-compressed'],
  extensions: ['.pdf', '.zip'],
} as const

export const MESSAGE_MAX_LENGTH = 1000

export const SAMPLE_PROJECTS: readonly Project[] = [
  {
    id: 'reading-app',
    title: 'Aplicație de organizare a lecturilor',
    status: 'in-progress',
    meta: 'Mentor: Mihai Popescu · Frontend & React · Termen: 3 decembrie 2026',
    description:
      'Construiește lista de lecturi, integrează un API și adaugă teste pentru fluxurile principale.',
    stages: [
      { label: 'Fundamente JavaScript', isDone: true },
      { label: 'Git și colaborare', isDone: true },
      { label: 'Prima aplicație React', isDone: true },
      { label: 'Integrare API și testare', isDone: false },
      { label: 'Portofoliu și interviuri', isDone: false },
    ],
    feedback: {
      title: 'Mihai Popescu · Feedback pe versiunea 1',
      text: 'Structura componentelor este clară. Înainte de următoarea predare, separă logica de fetch într-un hook și adaugă stările de încărcare și eroare.',
      nextStep: 'Următorul pas: testează răspunsul gol și indisponibilitatea API-ului.',
    },
  },
  {
    id: 'reusable-components',
    title: 'Componente reutilizabile',
    status: 'submitted',
    meta: 'Versiunea 2 · Trimis pe 19 noiembrie · Așteaptă feedback',
  },
  {
    id: 'js-fundamentals',
    title: 'Fundamente JavaScript',
    status: 'done',
    meta: 'Aprobat de mentor · 12 noiembrie',
    feedback: {
      title: 'Mihai Popescu · Feedback final',
      text: 'Ai înțeles bine closures și promisiunile. Exercițiile cu array-uri sunt curate și ușor de citit.',
    },
  },
]
