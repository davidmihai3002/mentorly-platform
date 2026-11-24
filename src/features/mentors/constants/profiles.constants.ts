import type { ApplicationQuestion, MentorProfile } from '../types'

type ProfileDetails = Omit<MentorProfile, 'mentor'>

export const DEFAULT_APPLICATION_QUESTIONS: readonly ApplicationQuestion[] = [
  {
    id: 'goal',
    label: 'Ce obiectiv profesional vrei să atingi în următoarele 3 luni?',
    placeholder: 'Povestește-mi ce ar însemna progresul pentru tine…',
  },
  {
    id: 'project',
    label: 'La ce proiect ai lucrat și ce te-a blocat?',
    placeholder: 'Adaugă context și, dacă vrei, un link către cod…',
  },
  {
    id: 'time',
    label: 'Cât timp poți aloca săptămânal practicii?',
    placeholder: 'Descrie ritmul tău și așteptările de la mentorat…',
  },
]

export const PROFILE_DETAILS: Readonly<Record<string, ProfileDetails>> = {
  'mihai-popescu': {
    category: 'Tehnologie',
    meta: 'Tehnologie · JavaScript, React și arhitectură frontend · București / online',
    badges: ['Mentor verificat', 'Test de admitere'],
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
      { label: 'GitHub', href: 'https://github.com/' },
      { label: 'Portofoliu', href: 'https://developer.mozilla.org/' },
    ],
    sponsorNote:
      'Sponsorizat de X · Organizație fictivă prezentată la Parteneri. Sponsorul susține implicarea mea în comunitate; mentoratul și prețurile sunt stabilite de mine.',
    about: {
      title: 'De la cod care merge la cod care crește',
      text: 'Te ajut să înțelegi deciziile din spatele aplicațiilor frontend: structură, testare și compromisuri. Lucrăm pe proiectul tău, facem code review și construim un plan realist pentru următorul rol.',
      tags: ['React & TypeScript', 'Code review', 'Pregătire interviu'],
    },
    audience: {
      requirements:
        'Ai bazele HTML, CSS și JavaScript (funcții, obiecte, promisiuni), folosești Git și ai construit o aplicație mică. Nu cer experiență profesională sau o diplomă anume.',
      fit: 'Vrei un rol junior–mid în frontend, poți dedica 3–4 ore pe săptămână practicii și ești deschis(ă) la feedback. Nu ofer teme rezolvate în locul tău sau promisiuni de angajare.',
    },
    workStyle: {
      paragraphs: [
        'Sesiuni online, 1-la-1, de 60 de minute, în limba română. Stabilim obiective la început, revizuim progresul săptămânal și păstrăm notițe comune. Te rog să trimiți codul înainte de întâlnire.',
        'Reprogramarea se discută cu cel puțin 24 de ore înainte. Apelul introductiv gratuit durează 20 de minute și ne ajută să verificăm potrivirea, fără obligații.',
      ],
      note: 'Rămân disponibil pentru întrebările cursanților mei și între apeluri, în grupul nostru privat. Încerc să răspund când îmi permite programul: este angajamentul meu personal, nu o regulă impusă de platformă sau o garanție de răspuns automat.',
    },
    pricing: {
      monthlyPrice: 720,
      monthlyMeta: '4 sesiuni de 60 min / 30 zile, în loc de 800 lei.',
      discountNote: 'Reducere de 80 lei aleasă de mine, ca mentor. Nu este impusă de Mentorly.',
    },
    capacity: { max: 4, current: 3 },
    availability: {
      introSlots: [
        { weekday: 1, start: '18:00' },
        { weekday: 1, start: '19:00' },
        { weekday: 4, start: '19:00' },
        { weekday: 4, start: '20:00' },
      ],
    },
    experience: {
      jobs: [
        { title: 'Tech Lead · Vectora Studio', meta: '2022–prezent · echipă frontend de 6 oameni' },
        { title: 'Frontend Engineer · Nodus Digital', meta: '2017–2022 · aplicații web B2B' },
      ],
      links: [
        { label: 'linkedin.com/in/mihai-popescu-demo', href: 'https://www.linkedin.com/' },
        { label: 'github.com/mihai-popescu-demo', href: 'https://github.com/' },
      ],
      achievement:
        'Am coordonat migrarea unei aplicații la TypeScript și am construit un program intern de onboarding pentru 12 colegi.',
      certifications: [
        'Meta Front-End Developer · 2023',
        'AWS Certified Cloud Practitioner · 2025',
      ],
      recommendation: {
        quote:
          '„Mihai explică deciziile, nu doar soluțiile. Mi-a dat încredere să conduc un proiect.”',
        author: '— Ana D., fostă colegă · recomandare ilustrativă',
      },
    },
    reviews: {
      criteria: [
        { label: 'Claritatea explicațiilor', score: 5 },
        { label: 'Expertiză practică', score: 4.9 },
        { label: 'Comunicare', score: 4.8 },
        { label: 'Utilitatea feedbackului', score: 4.9 },
      ],
      items: [
        {
          id: 'radu',
          author: 'Radu S.',
          rating: 5,
          date: 'octombrie 2026',
          quote:
            '„Mihai m-a ajutat să trec de la executant la lider. Discuțiile noastre au avut impact imediat în munca mea.”',
        },
        {
          id: 'irina',
          author: 'Irina T.',
          rating: 5,
          date: 'septembrie 2026',
          quote:
            '„Feedback pe codul meu, obiective clare și răbdare. Acum pot explica singură alegerile de arhitectură.”',
        },
      ],
    },
    applicationQuestions: DEFAULT_APPLICATION_QUESTIONS,
    admissionTest: {
      intro:
        'Testul este opțional la nivel de mentor: nu este o cerință universală Mentorly. Pentru acest program, Mihai a ales două întrebări cu răspuns liber, bazate pe materialele de mai jos.',
      resources: [
        {
          label: 'MDN · Utilizarea promisiunilor — developer.mozilla.org',
          href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises',
        },
        {
          label: 'React · Thinking in React — react.dev/learn/thinking-in-react',
          href: 'https://react.dev/learn/thinking-in-react',
        },
      ],
      questions: [
        {
          id: 'parallel-requests',
          label: 'Cum ai trata încărcarea și erorile când două cereri API rulează în paralel?',
          placeholder: 'Explică raționamentul tău, pornind de la materialul MDN despre promisiuni…',
        },
        {
          id: 'filterable-list',
          label: 'Cum ai împărți o listă filtrabilă în componente și unde ai păstra starea?',
          placeholder:
            'Descrie o structură simplă și justifică alegerea pe baza Thinking in React…',
        },
      ],
    },
  },
}
