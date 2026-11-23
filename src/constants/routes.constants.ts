export const ROUTES = {
  home: '/',
  about: '/ce-este-mentorly',
  community: '/comunitate',
  reviews: '/recenzii',
  partners: '/parteneri',
  login: '/autentificare',
  signup: '/inregistrare',
  mentorSignup: '/inregistrare/mentor',
  forgotPassword: '/parola-uitata',
  resetPassword: '/resetare-parola',
  student: '/cursant',
  quiz: '/test-potrivire',
  quizResults: '/test-potrivire/recomandari',
  topMentors: '/top-mentori',
  mentors: '/mentori',
  mentorProfile: '/mentori/:mentorId',
  booking: '/cursant/rezervare/:mentorId',
  mentor: '/mentor',
  componentsPreview: '/dev/componente',
} as const

export const MAIN_CONTENT_ID = 'continut'

export const LOGOUT_STATE = { loggedOut: true } as const
