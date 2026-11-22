import type { InterestId, QuizStep } from '../types'

export const QUIZ_TEXT = {
  pageTitle: 'Test de potrivire – Mentorly',
  introTitle: 'Mentorul potrivit începe cu tine',
  introSubtitle: 'Câteva răspunsuri scurte. O direcție mai clară pentru următorul pas.',
  introBadge: '4 pași · aproximativ 2 minute',
  introHeadline: 'Mai puțin timp căutând. Mai mult timp crescând.',
  introLead:
    'Spune-ne ce vrei să obții și cum îți place să înveți. Îți recomandăm 3 mentori și îți explicăm de ce se potrivesc cu tine.',
  introNote:
    'Nu există răspunsuri greșite. Poți reveni la un pas anterior, iar recomandările nu te obligă să aplici.',
  start: 'Începe testul',
  exploreMentors: 'Explorează direct mentorii',
  explainedTitle: 'Recomandări explicate, nu doar o listă',
  explainedText:
    'Vei vedea ce aveți în comun: domeniul, obiectiv de carieră, nivel și stil de lucru.',
  stepOf: (step: number, total: number) => `Pasul ${step} din ${total}`,
  back: 'Înapoi',
  next: 'Continuă',
  seeResults: 'Vezi recomandările',
  skipStep: 'Sari peste acest pas',
  generalResults: 'Recomandări generale',
  missingAnswer: 'Alege un răspuns ca să continui.',
  interestsLegend: 'Interese · poți selecta mai multe',
  preferences: ['Limba: Română', 'Format: online, 1-la-1'],
} as const

export const INTERESTS: readonly { readonly id: InterestId; readonly label: string }[] = [
  { id: 'react', label: 'React' },
  { id: 'interviews', label: 'Interviuri' },
  { id: 'testing', label: 'Testare' },
  { id: 'ux', label: 'UX' },
]

export const QUIZ_STEPS: readonly QuizStep[] = [
  {
    id: 'goal',
    label: 'Obiectiv',
    teaser: 'Ce vrei să obții?',
    title: 'Să începem cu obiectivul tău',
    subtitle: 'Nu este un examen. Răspunde liber.',
    question: 'Ce vrei să obții prin mentorat?',
    hint: 'Alege un singur răspuns.',
    options: [
      {
        value: 'first-role',
        title: 'Primul meu rol în domeniu',
        description: 'Îmi construiesc portofoliul și mă pregătesc pentru interviuri.',
        summary: 'Primul rol',
      },
      {
        value: 'confidence',
        title: 'Mai multă încredere în rolul actual',
        description: 'Vreau să aprofundez competențe și să primesc feedback.',
        summary: 'Încredere în rol',
      },
      {
        value: 'career-change',
        title: 'O schimbare de carieră',
        description: 'Explorez o direcție nouă, cu un plan realist.',
        summary: 'Schimbare de carieră',
      },
      {
        value: 'project',
        title: 'Un proiect dus la capăt',
        description: 'Am o idee și am nevoie de ghidare aplicată.',
        summary: 'Proiect propriu',
      },
    ],
  },
  {
    id: 'level',
    label: 'Nivel',
    teaser: 'De unde pornești?',
    title: 'Pornim de unde ești acum',
    subtitle: 'Experiența ta ne ajută să alegem sprijinul potrivit.',
    question: 'Cum îți descrii nivelul actual?',
    hint: 'Alege nivelul care te reprezintă acum.',
    options: [
      {
        value: 'beginner',
        title: 'Începător',
        description: 'Sunt la primii pași și am nevoie de fundamente.',
        summary: 'Începător',
      },
      {
        value: 'advanced-beginner',
        title: 'Începător avansat',
        description: 'Cunosc bazele și am lucrat la câteva proiecte mici.',
        summary: 'Începător avansat',
      },
      {
        value: 'intermediate',
        title: 'Intermediar',
        description: 'Lucrez independent și vreau să aprofundez.',
        summary: 'Intermediar',
      },
      {
        value: 'advanced',
        title: 'Avansat',
        description: 'Caut perspectivă strategică și provocări noi.',
        summary: 'Avansat',
      },
    ],
  },
  {
    id: 'domain',
    label: 'Domeniu',
    teaser: 'Ce vrei să înveți?',
    title: 'Ce vrei să explorezi?',
    subtitle: 'Alege domeniul în care vrei să faci următorul pas.',
    question: 'În ce domeniu cauți un mentor?',
    hint: 'Alege un domeniu principal.',
    options: [
      {
        value: 'it-frontend',
        title: 'IT · Frontend / Software',
        description: 'Dezvoltare web, aplicații și calitatea codului.',
        summary: 'IT · Frontend',
      },
      {
        value: 'management',
        title: 'Management',
        description: 'Leadership, delegare și dezvoltarea echipelor.',
        summary: 'Management',
      },
      {
        value: 'hr',
        title: 'HR · Resurse umane',
        description: 'Recrutare, dezvoltarea oamenilor și cultură organizațională.',
        summary: 'HR',
      },
      {
        value: 'ux-product',
        title: 'UX / Product',
        description: 'Research, experiențe digitale și decizii de produs.',
        summary: 'UX / Product',
      },
      {
        value: 'business',
        title: 'Business',
        description: 'Strategie, validarea ideilor și dezvoltarea afacerii.',
        summary: 'Business',
      },
      {
        value: 'marketing',
        title: 'Marketing',
        description: 'Poziționare, campanii și analizarea rezultatelor.',
        summary: 'Marketing',
      },
    ],
  },
  {
    id: 'pace',
    label: 'Ritm',
    teaser: 'Cât timp ai?',
    title: 'Un ritm care funcționează pentru tine',
    subtitle: 'Mentoratul se adaptează programului tău, nu invers.',
    question: 'Cât timp poți dedica săptămânal?',
    hint: 'Alege un ritm realist. Îl poți discuta apoi cu mentorul.',
    options: [
      {
        value: 'relaxed',
        title: '1–2 ore · Ritm relaxat',
        description: 'Pași mici, cu spațiu pentru programul tău.',
        summary: '1–2 ore / săpt.',
      },
      {
        value: 'steady',
        title: '3–4 ore · Ritm constant',
        description: 'O sesiune pe săptămână și timp pentru practică.',
        summary: '3–4 ore / săpt.',
      },
      {
        value: 'intense',
        title: '5–8 ore · Ritm intens',
        description: 'Mai multă practică și obiective săptămânale.',
        summary: '5–8 ore / săpt.',
      },
    ],
  },
]

export const QUIZ_PARAM_KEYS = {
  goal: 'obiectiv',
  level: 'nivel',
  domain: 'domeniu',
  pace: 'ritm',
  interests: 'interese',
} as const
