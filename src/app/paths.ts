/** Adresele aplicației, într-un singur loc. Folosește-le în loc de șiruri scrise de mână. */
export const PATHS = {
  home: '/',
  mentors: '/mentori',
  login: '/autentificare',
  registerMentee: '/inregistrare/cursant',
  registerMentor: '/inregistrare/mentor',
  menteeDashboard: '/cursant',
  mentorDashboard: '/mentor',
} as const

/** Id-ul elementului <main> din fiecare layout; ținta link-ului „Sari la conținut”. */
export const MAIN_CONTENT_ID = 'continut'
