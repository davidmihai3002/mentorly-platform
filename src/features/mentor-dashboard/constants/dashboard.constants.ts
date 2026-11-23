import type { EarningsMonth, StatCard, StudentRow, UpcomingSession, WeekDay } from '../types'

export const SECTION_IDS = {
  overview: 'privire-de-ansamblu',
  calendar: 'calendar',
  students: 'cursanti',
  earnings: 'castiguri',
} as const

export const DASHBOARD_TEXT = {
  pageTitle: 'Dashboard mentor – Mentorly',
  greeting: (firstName: string) => `Bună, ${firstName}!`,
  fallbackName: 'mentorule',
  subtitle: 'Un loc pentru sesiuni, cursanți și progresul activității tale.',
  sectionsLabel: 'Secțiunile dashboard-ului',
  sections: [
    { id: SECTION_IDS.overview, label: 'Privire de ansamblu' },
    { id: SECTION_IDS.calendar, label: 'Calendar' },
    { id: SECTION_IDS.students, label: 'Cursanți' },
    { id: SECTION_IDS.earnings, label: 'Câștiguri' },
  ],
  statsLabel: 'Indicatori',
  earningsTitle: 'Evoluția câștigurilor',
  earningsNote: 'Brut, înainte de comisioane',
  earningsLabel: 'Câștiguri brute pe lună',
  showHistory: 'Vezi istoricul plăților',
  hideHistory: 'Ascunde istoricul plăților',
  historyCaption: 'Istoricul plăților (brut)',
  monthColumn: 'Luna',
  amountColumn: 'Sumă',
  upcomingTitle: 'Următoarele sesiuni',
  manageCalendar: 'Gestionează calendarul',
  weekTitle: '23–29 noiembrie',
  noSessions: 'Fără sesiuni',
  studentsTitle: 'Cursanții mei',
  studentActionContext: (student: string) => ` · ${student}`,
} as const

export const STATS: readonly StatCard[] = [
  { label: 'Câștig brut · noiembrie', value: '2.400 lei', detail: '12 sesiuni finalizate' },
  { label: 'Sesiuni viitoare', value: '3', detail: '23–30 noiembrie' },
  { label: 'Cursanți activi', value: '3 / 4', detail: '1 loc liber' },
  { label: 'Evaluare generală', value: '4,9 / 5', detail: '24 de recenzii' },
]

export const EARNINGS: readonly EarningsMonth[] = [
  { month: 'Aug', fullMonth: 'August', amount: 1200 },
  { month: 'Sep', fullMonth: 'Septembrie', amount: 1600 },
  { month: 'Oct', fullMonth: 'Octombrie', amount: 2200 },
  { month: 'Nov', fullMonth: 'Noiembrie', amount: 2400 },
]

export const UPCOMING_SESSIONS: readonly UpcomingSession[] = [
  { when: '23 NOV · 18:00–19:00', student: 'Andreea Marin', topic: 'Code review & API' },
  { when: '23 NOV · 19:00–20:00', student: 'Radu S.', topic: 'Arhitectură React' },
  { when: '30 NOV · 18:00–19:00', student: 'Irina T.', topic: 'Testare frontend' },
]

export const WEEK: readonly WeekDay[] = [
  { label: 'Lun 23', entries: ['18:00 · Andreea', '19:00 · Radu'] },
  { label: 'Mar 24', entries: [] },
  { label: 'Mie 25', entries: [] },
  { label: 'Joi 26', entries: ['19:00 · Liber', '20:00 · Liber'] },
  { label: 'Vin 27', entries: [] },
  { label: 'Sâm 28', entries: [] },
  { label: 'Dum 29', entries: [] },
]

export const MY_STUDENTS: readonly StudentRow[] = [
  { name: 'Andreea Marin', progress: '60% · Integrare API', action: '1 proiect de revizuit' },
  { name: 'Radu S.', progress: '40% · Arhitectură React', action: 'Vezi planul de învățare' },
  { name: 'Irina T.', progress: '80% · Testare frontend', action: 'Trimite feedback' },
]

export const DASHBOARD_MENTOR_ID = 'mihai-popescu'
