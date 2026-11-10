/** Textele paginii de login, într-un singur loc. */
export const LOGIN_TEXT = {
  brand: 'Mentorly',
  pageTitle: 'Autentificare – Mentorly',
  title: 'Bine ai revenit',
  subtitle: 'Intră în cont ca să continui drumul alături de mentorul tău.',
  emailLabel: 'Email',
  emailPlaceholder: 'nume@exemplu.ro',
  passwordLabel: 'Parolă',
  forgotPassword: 'Ai uitat parola?',
  submit: 'Intră în cont',
  divider: 'sau',
  google: 'Continuă cu Google',
  noAccount: 'Nu ai cont? Creează unul:',
  registerMentee: 'Caut un mentor',
  registerMentor: 'Vreau să devin mentor',
  freeCall: 'Primul apel introductiv e gratuit',
  panelTitle: 'Găsește mentorul potrivit',
  panelText: 'Mentori verificați, care te ascultă și te ghidează pas cu pas în carieră.',
  panelBenefits: [
    'Mentori verificați, cu experiență reală',
    'Primul apel introductiv e gratuit',
    'Feedback personal după fiecare ședință',
  ],
} as const

/** Un profil ilustrativ pentru panoul de brand (nu e un mentor real). */
export const MENTOR_PREVIEW = {
  caption: 'Exemplu de profil',
  initials: 'AM',
  name: 'Ana Marin',
  role: 'Senior Product Manager',
  rating: '4,9 · 32 de recenzii',
  availability: 'Disponibil azi',
  skills: ['Product Management', 'UX/UI', 'Carieră'],
} as const

/** Acțiunile din pagina de login. Până la backend, fiecare doar se loghează în consolă. */
export const LOGIN_ACTIONS = [
  'login',
  'google',
  'forgot-password',
  'register-mentee',
  'register-mentor',
] as const
