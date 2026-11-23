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
  mentorReviews: '/mentori/:mentorId/recenzii',
  writeReview: '/cursant/recenzie/:mentorId',
  projects: '/cursant/proiecte',
  booking: '/cursant/rezervare/:mentorId',
  bookingSummary: '/cursant/rezervare/:mentorId/sumar',
  bookingPayment: '/cursant/rezervare/:mentorId/plata',
  bookingConfirmed: '/cursant/rezervare/:mentorId/confirmare',
  reschedule: '/cursant/rezervare/:mentorId/reprogramare',
  rescheduleConfirmed: '/cursant/rezervare/:mentorId/reprogramare/confirmata',
  mentor: '/mentor',
  componentsPreview: '/dev/componente',
} as const

export const MAIN_CONTENT_ID = 'continut'

export const LOGOUT_STATE = { loggedOut: true } as const
