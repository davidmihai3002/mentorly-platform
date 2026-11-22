import { ROUTES } from './routes.constants'

export const SITE_TEXT = {
  brand: 'Mentorly',
  mainNavLabel: 'Navigare principală',
  footerNavLabel: 'Linkuri utile',
  login: 'Autentificare',
  register: 'Înregistrare',
  copyright: '© 2026 Mentorly · Creștem împreună.',
  accountMenu: 'Contul meu',
  logout: 'Deconectare',
  skipToContent: 'Sari la conținut',
  openMenu: 'Deschide meniul',
  closeMenu: 'Închide meniul',
  mobileNavLabel: 'Navigare mobilă',
} as const

export const NAV_LINKS = [
  { label: 'Ce este Mentorly', to: ROUTES.about },
  { label: 'Comunitate Q&A', to: ROUTES.community },
  { label: 'Recenzii', to: ROUTES.reviews },
  { label: 'Parteneri', to: ROUTES.partners },
] as const

export const FOOTER_LINKS = [
  { label: 'Contact', href: '#contact' },
  { label: 'Confidențialitate', href: '#confidentialitate' },
  { label: 'Termeni și condiții', href: '#termeni-si-conditii' },
] as const

export const NOT_FOUND_TEXT = {
  pageTitle: 'Pagină negăsită – Mentorly',
  code: '404',
  title: 'Pagina nu a fost găsită',
  subtitle: 'Linkul poate fi greșit sau pagina a fost mutată.',
  backHome: 'Înapoi la pagina principală',
} as const

export const ACCOUNT_PLACEHOLDER_TEXT = {
  student: { pageTitle: 'Contul de cursant – Mentorly', title: 'Contul de cursant' },
  mentor: { pageTitle: 'Contul de mentor – Mentorly', title: 'Contul de mentor' },
  comingSoon: 'Această secțiune va fi disponibilă în curând.',
} as const
