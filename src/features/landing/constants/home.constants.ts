import { ROUTES } from '@/constants'

export const HOME_TEXT = {
  pageTitle: 'Mentorly – Construiește-ți cariera cu oameni care au fost deja acolo',
  titleStart: 'Construiește-ți cariera cu oameni care au fost',
  titleAccent: 'deja acolo.',
  lead: 'Conectează-te cu profesioniști din industrie și obține îndrumare personalizată prin ședințe adaptate obiectivelor tale.',
  findMentor: 'Găsește-ți mentorul',
  becomeMentor: 'Devino mentor',
} as const

export const LANDING_LINKS = {
  findMentor: ROUTES.quiz,
  becomeMentor: ROUTES.mentorSignup,
  askQuestion: ROUTES.signup,
} as const
