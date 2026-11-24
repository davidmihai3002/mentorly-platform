import { formatLei } from '@/utils'
export const BOOKING_TEXT = {
  pageTitle: 'Rezervare – Mentorly',
  title: 'Alege momentul potrivit',
  subtitle: (mentor: string, topic: string) => `Sesiune individuală cu ${mentor} · ${topic}.`,
  previousMonth: 'Luna anterioară',
  nextMonth: 'Luna următoare',
  calendarLegend: 'Albastru deschis: disponibil · Albastru închis: selectat',
  chooseTime: 'Alege ora sesiunii',
  duration: '60 minute',
  chooseFromAvailable: 'Alege dintre intervalele disponibile.',
  busy: 'Ocupat',
  slotsLabel: 'Intervale orare',
  sessionWith: (mentor: string) => `Sesiune cu ${mentor}`,
  noSlots: 'Nu există intervale libere în această zi.',
  continueToSummary: 'Continuă spre sumar',
  backToMentor: 'Înapoi la mentor',
  notFoundTitle: 'Rezervarea nu poate fi deschisă',
  notFoundText: 'Mentorul nu a fost găsit sau nu are intervale disponibile.',
  backToSearch: 'Înapoi la căutare',
  weekdays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
  weekdayNames: ['luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă', 'duminică'],
} as const

export const STEPS_TEXT = {
  label: 'Pașii rezervării',
  steps: ['Sumar comandă', 'Plată', 'Confirmare'],
} as const

export const SUMMARY_TEXT = {
  pageTitle: 'Verifică rezervarea – Mentorly',
  title: 'Verifică rezervarea',
  subtitle: 'Mai e un singur pas până la următoarea conversație care contează.',
  accepted: 'Cerere de mentorat acceptată',
  mentorMeta: (topic: string) => `${topic} · Mentorat 1-la-1`,
  sessionTitle: 'Sesiune individuală · 60 minute',
  timezone: 'Ora României',
  format: 'Online · Limba română',
  objective: 'Obiectiv: code review și integrare API în proiectul de lecturi.',
  changeSlot: 'Schimbă data și ora',
  rescheduleNote:
    'Reprogramarea se discută cu cel puțin 24 de ore înainte, conform condițiilor mentorului.',
  orderTitle: 'Sumar comandă',
  sessionLine: '1 × sesiune',
  fees: 'Taxe suplimentare',
  total: 'Total de plată',
  oneOff: 'Plată unică · Fără abonament automat.',
  continueToPayment: 'Continuă la plată',
  securedBy: 'Plată securizată prin Stripe',
  beforePaymentTitle: 'Înainte de plată',
  beforePaymentText: 'Ai discutat potrivirea cu mentorul și cererea a fost acceptată.',
} as const

export const PAYMENT_TEXT = {
  pageTitle: 'Finalizează plata – Mentorly',
  title: 'Finalizează plata',
  subtitle: 'Verifică detaliile și confirmă sesiunea de mentorat.',
  paymentTitle: 'Date de plată',
  provider: 'Stripe',
  billingTitle: 'Detalii de facturare',
  orderTitle: 'Comanda ta',
  orderMeta: '60 minute · Europe/Bucharest',
  session: 'Sesiune',
  total: 'Total',
  receiptNote: 'Confirmarea și factura vor fi trimise la adresa de email.',
  pay: (amount: number) => `Plătește ${formatLei(amount)}`,
  cardNote: 'Datele cardului sunt procesate de Stripe. Mentorly nu stochează numărul cardului.',
  backToSummary: 'Înapoi la sumar',
  terms: 'Accept Termenii și condițiile și politica de reprogramare a mentorului.',
} as const

export const CONFIRMATION_TEXT = {
  pageTitle: 'Rezervare confirmată – Mentorly',
  title: 'Rezervarea ta este confirmată',
  subtitle: 'Totul este pregătit pentru următorul tău pas.',
  paid: (amount: number) => `Plată reușită · ${formatLei(amount)}`,
  greeting: (name?: string) => (name ? `Ne vedem la sesiune, ${name}!` : 'Ne vedem la sesiune!'),
  emailSent: (email?: string) =>
    email
      ? `Confirmarea și factura au fost trimise la ${email}.`
      : 'Confirmarea și factura au fost trimise pe email.',
  sessionMeta: '60 minute · Online · Europe/Bucharest',
  reference: (amount: number, last4?: string) =>
    ['Rezervare ML-2026-024', last4 && `Card •••• ${last4}`, `Achitat ${formatLei(amount)}`]
      .filter(Boolean)
      .join(' · '),
  viewSession: 'Vezi sesiunea',
  addToCalendar: 'Adaugă în calendar',
  nextSteps: [
    {
      title: '01 · Pregătește proiectul',
      text: 'Trimite repository-ul și întrebările înainte de întâlnire.',
    },
    {
      title: '02 · Deschide sesiunea',
      text: 'Linkul de conectare este disponibil în detaliile rezervării.',
    },
    {
      title: '03 · Urmărește progresul',
      text: 'Păstrează notițele și pașii următori în spațiul tău personal.',
    },
  ],
  rescheduleHint: 'Ai nevoie de alt interval?',
  rescheduleLink: 'Cere reprogramarea cu cel puțin 24 de ore înainte.',
} as const

export const RESCHEDULE_TEXT = {
  pageTitle: 'Reprogramează sesiunea – Mentorly',
  title: 'Reprogramează sesiunea',
  subtitle: 'Alege un nou interval din disponibilitatea mentorului.',
  currentTitle: 'Programare actuală',
  currentMeta: '60 minute · Online · Europe/Bucharest',
  currentNote:
    'Poți solicita reprogramarea cu minimum 24 de ore înainte. Rezervarea actuală rămâne valabilă până confirmi schimbarea.',
  noExtraCost: 'Fără plată suplimentară pentru această schimbare de interval.',
  confirm: 'Confirmă reprogramarea',
  keep: 'Păstrează programarea actuală',
  messageLabel: 'Mesaj pentru mentor · opțional',
  messagePlaceholder: 'A intervenit o schimbare în programul meu. Mulțumesc pentru flexibilitate!',
  sameSlot: 'Alege un interval diferit de programarea actuală.',
  confirmedPageTitle: 'Sesiune reprogramată – Mentorly',
  confirmedTitle: 'Sesiunea a fost reprogramată',
  confirmedSubtitle: 'Noul interval este confirmat. Planul tău de învățare continuă.',
  confirmedBadge: 'Reprogramare confirmată',
  confirmedHeadline: 'Noul moment, aceeași direcție.',
  bookingLine: (mentor: string) => `Rezervare · ${mentor} · Sesiune 1-la-1`,
  previous: 'Interval anterior · eliberat',
  next: 'Noul interval · confirmat',
  meta: 'Ora României · Europe/Bucharest · Online · 60 minute',
  notified: (amount: number, email?: string) =>
    `Mentorul a fost notificat. Confirmarea actualizată a fost trimisă ${email ? `la ${email}` : 'pe email'}. Plata de ${amount} lei rămâne asociată sesiunii.`,
  viewUpdated: 'Vezi sesiunea actualizată',
  updateCalendar: 'Actualizează calendarul',
} as const

export const SESSION_TOPICS: Readonly<Record<string, string>> = {
  'mihai-popescu': 'Frontend & React',
}

export { BOOKING_PARAM_KEYS } from '@/constants'

export const MESSAGE_MAX_LENGTH = 500
