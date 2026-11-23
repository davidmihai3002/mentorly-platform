import type { GoalStatus, LearningGoal, SessionEntry, StudentDetails } from '../types'

export const STUDENT_PROFILE_TEXT = {
  pageTitle: 'Profilul meu de cursant – Mentorly',
  title: 'Profilul meu de cursant',
  edit: 'Editează profilul',
  cancelEdit: 'Renunță',
  save: 'Salvează',
  saved: 'Profilul a fost actualizat.',
  badges: ['Cursant', 'Frontend · Începător avansat'],
  memberSince: 'Membru din septembrie 2026',
  careerGoalPrefix: 'Obiectiv de carieră:',
  privacy:
    'Spațiul tău personal: progresul și programările sunt vizibile doar ție și mentorului tău.',
  aboutTitle: 'Despre mine',
  studyTimeLabel: 'Disponibilă pentru studiu:',
  studyTime: '4 ore / săptămână',
  skillsTitle: 'Competențe actuale',
  skillsMeta: ['Domeniu: dezvoltare web frontend', 'Nivel autoevaluat: începător avansat'],
  skills: ['HTML & CSS', 'JavaScript', 'Git', 'React de bază', 'Figma'],
  deepenTitle: 'Vreau să aprofundez',
  deepen: 'TypeScript, testare, accesibilitate și pregătirea pentru interviuri tehnice.',
  linksTitle: 'Mă găsești și aici',
  linksNote: 'Linkuri demonstrative, pentru acest profil ilustrativ.',
  mentorshipTitle: 'Mentorat în desfășurare',
  active: 'Activ',
  mentorMeta: 'Frontend & React · Mentor verificat',
  program: 'Program: de la primul proiect React la un portofoliu pregătit pentru angajare.',
  mentorshipFacts: [
    ['Din 2 noiembrie 2026', 'Plan lunar · 4 sesiuni'],
    ['3 sesiuni finalizate', '720 lei / lună'],
  ],
  viewMentor: 'Vezi profilul mentorului',
  openGroup: 'Deschide grupul',
  goalsTitle: 'Obiective și progres',
  goalsMeta: '3 din 5 obiective îndeplinite · actualizat pe 9 noiembrie',
  progressLabel: 'Progres obiective',
  viewProjects: 'Vezi proiectele și feedbackul',
  sessionsTitle: 'Sesiuni și istoric',
  sessionsNote: 'Ora României · Sesiuni cu Mihai Popescu, în intervalele sale săptămânale.',
  allBookings: 'Vezi toate programările',
  goalStatus: {
    done: 'Finalizat',
    'in-progress': 'În progres',
    planned: 'Planificat',
  } satisfies Record<GoalStatus, string>,
  fields: {
    fullName: 'Nume afișat',
    careerGoal: 'Obiectiv de carieră',
    city: 'Localitate',
    about: 'Despre mine',
  },
  errors: {
    fullName: 'Introdu un nume de 2–60 de caractere.',
    careerGoal: 'Descrie obiectivul în 5–120 de caractere.',
    city: 'Introdu localitatea (2–60 de caractere).',
    about: 'Scrie cel mult 600 de caractere.',
  },
} as const

export const INITIAL_STUDENT: StudentDetails = {
  fullName: 'Andreea Marin',
  careerGoal: 'primul meu rol de Frontend Developer',
  city: 'Cluj-Napoca',
  about:
    'Vin din marketing și am descoperit că îmi place să construiesc interfețe. Învăț frontend de 8 luni, iar acum lucrez la o aplicație de organizare a lecturilor. Caut feedback sincer și un ritm de învățare pe care să îl pot susține alături de job.',
}

export const STUDENT_LINKS = [
  { label: 'LinkedIn · andreea-marin-demo', href: 'https://www.linkedin.com/' },
  { label: 'GitHub · andreea-marin-demo', href: 'https://github.com/' },
  { label: 'Portofoliu · andreeamarin.example', href: 'https://example.com/' },
] as const

export const LEARNING_GOALS: readonly LearningGoal[] = [
  { title: 'Fundamente JavaScript', detail: 'Funcții, obiecte și metode de array', status: 'done' },
  { title: 'Git și colaborare', detail: 'Branch-uri și primul pull request', status: 'done' },
  { title: 'Prima aplicație React', detail: 'Componente, props și state', status: 'done' },
  {
    title: 'Integrare API și testare',
    detail: 'În lucru · țintă: 19 noiembrie',
    status: 'in-progress',
  },
  { title: 'Portofoliu și interviu', detail: 'Urmează · țintă: 3 decembrie', status: 'planned' },
]

export const SESSION_HISTORY: readonly SessionEntry[] = [
  {
    day: '23',
    month: 'Noi',
    title: 'Code review & integrare API',
    meta: 'Luni · 18:00–19:00 · Online',
  },
  {
    day: '16',
    month: 'Noi',
    title: 'Testarea componentelor React',
    meta: 'Luni · 18:00–19:00 · Finalizată',
  },
]

export const ACTIVE_MENTOR_ID = 'mihai-popescu'

export const PROFILE_LIMITS = { aboutMax: 600 } as const
