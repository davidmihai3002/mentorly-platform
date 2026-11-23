import { AVAILABILITY_LABELS, DOMAINS, LANGUAGE_LABELS } from '@/constants'
import type { FilterKey, SelectOption, SortId } from '../types'

export const SEARCH_TEXT = {
  pageTitle: 'Găsește-ți mentorul – Mentorly',
  title: 'Găsește-ți mentorul',
  gridSubtitle: 'Experiență relevantă, feedback sincer și un plan pentru tine.',
  listSubtitle: 'Compară experiența și alege omul cu care vrei să crești.',
  topMentors: 'Top Mentori',
  quiz: 'Test de potrivire',
  searchLabel: 'Caută mentori',
  searchPlaceholder: 'Caută după nume, rol sau competență',
  search: 'Caută',
  filtersTitle: 'Filtre',
  filtersToggle: (count: number) => (count ? `Filtre (${count})` : 'Filtre'),
  apply: 'Aplică filtrele',
  reset: 'Resetează',
  anyOption: 'Oricare',
  resultCount: (count: number) => (count === 1 ? '1 mentor găsit' : `${count} mentori găsiți`),
  showing: (shown: number, total: number) => `Afișezi ${shown} din ${total} rezultate.`,
  sortLabel: 'Sortează',
  viewLabel: 'Mod de afișare',
  grid: 'Grid',
  list: 'Listă',
  removeFilter: (label: string) => `Elimină filtrul ${label}`,
  activeFilters: 'Filtre active',
  empty: 'Niciun mentor nu se potrivește filtrelor. Încearcă să elimini unul.',
  available: 'Disponibil',
} as const

export const FILTER_LABELS: Readonly<Record<FilterKey, string>> = {
  domain: 'Domeniu',
  language: 'Limbă',
  maxPrice: 'Preț / sesiune',
  minRating: 'Rating minim',
  availability: 'Disponibilitate',
}

export const PRICE_LIMITS = [150, 200, 250, 300] as const

export const RATING_LIMITS = [4.5, 4.8] as const

export const FILTER_OPTIONS: Readonly<Record<FilterKey, readonly SelectOption[]>> = {
  domain: DOMAINS.map((domain) => ({ value: domain.id, label: domain.label })),
  language: Object.entries(LANGUAGE_LABELS).map(([value, label]) => ({ value, label })),
  maxPrice: PRICE_LIMITS.map((limit) => ({ value: String(limit), label: `Până la ${limit} lei` })),
  minRating: RATING_LIMITS.map((limit) => ({
    value: String(limit),
    label: `★ ${String(limit).replace('.', ',')} și peste`,
  })),
  availability: [
    { value: 'mon-thu', label: 'Luni sau joi' },
    { value: 'tue-fri', label: 'Marți sau vineri' },
    { value: 'weekend', label: AVAILABILITY_LABELS.weekend },
  ],
}

export const SORT_OPTIONS: readonly { readonly value: SortId; readonly label: string }[] = [
  { value: 'relevance', label: 'Relevanță' },
  { value: 'price-asc', label: 'Preț crescător' },
  { value: 'rating', label: 'Rating' },
]

export const SEARCH_PARAM_KEYS = {
  query: 'q',
  domain: 'domeniu',
  language: 'limba',
  maxPrice: 'pret',
  minRating: 'rating',
  availability: 'disponibil',
  sort: 'sortare',
  view: 'afisare',
} as const
