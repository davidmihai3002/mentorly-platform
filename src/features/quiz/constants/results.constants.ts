import type { DomainFilterId } from '../types'
import type { DomainId } from '@/types'

export const RESULTS_TEXT = {
  pageTitle: 'Recomandările tale – Mentorly',
  title: 'Top 3 mentori recomandați',
  subtitle: 'Potriviri pe baza obiectivului, nivelului, domeniului și ritmului tău.',
  generalSubtitle: 'Recomandări generale, pe baza celor mai apreciați mentori.',
  consideredTitle: 'Ce am luat în considerare',
  consideredNote: 'Română · online · Îți poți ajusta răspunsurile oricând.',
  firstRecommendation: 'Prima recomandare',
  whyMatchTitle: 'De ce vă potriviți',
  reasonDomain: (domain: string) => `Același domeniu: ${domain}`,
  reasonGoal: (goal: string) => `Obiectiv comun: ${goal}`,
  reasonLevel: (level: string) => `Lucrează cu nivelul ${level}`,
  experience: (years: number) => `Experiență: ${years} ani`,
  adjustAnswers: 'Ajustează răspunsurile',
  exploreAll: 'Explorează toți mentorii',
  disclaimer:
    'Recomandările sunt orientative. Citește profilul și verifică potrivirea într-o conversație introductivă înainte de aplicare.',
} as const

export const TOP_MENTORS_TEXT = {
  pageTitle: 'Top mentori – Mentorly',
  title: 'Top mentori, impact real',
  subtitle: 'Descoperă oameni care transformă experiența în progres pentru tine.',
  filterLabel: 'Filtrează după domeniu',
  progressTitle: 'Experiență care se vede în progres',
  progressText:
    'Selecție orientativă după evaluări, sesiuni finalizate și feedbackul cursanților. Profiluri și indicatori ilustrativi.',
  findMatch: 'Găsește mentorul potrivit',
  empty: 'Nu avem încă mentori de top în acest domeniu.',
  resultCount: (count: number) => (count === 1 ? '1 mentor afișat' : `${count} mentori afișați`),
} as const

export const DOMAIN_FILTERS: readonly {
  readonly id: DomainFilterId
  readonly label: string
  readonly domains: readonly DomainId[]
}[] = [
  { id: 'all', label: 'Toate domeniile', domains: [] },
  { id: 'it-product', label: 'IT & Product', domains: ['it-frontend', 'ux-product'] },
  { id: 'management', label: 'Management', domains: ['management'] },
  { id: 'hr', label: 'HR', domains: ['hr'] },
  { id: 'business', label: 'Business', domains: ['business'] },
]
