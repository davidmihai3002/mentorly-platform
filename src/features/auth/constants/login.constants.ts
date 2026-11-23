export const LOGIN_TEXT = {
  pageTitle: 'Autentificare – Mentorly',
  title: 'Autentificare',
  roleTitle: 'Cum vrei să continui?',
  roleText: 'Alege rolul tău. Autentificarea este simulată și nu solicită date reale.',
  roleStudent: 'Sunt cursant',
  roleMentor: 'Sunt mentor',
  google: 'Continuă cu Google',
  divider: 'sau cu email',
  emailLabel: 'Adresă de email',
  emailPlaceholder: 'exemplu@email.ro',
  passwordLabel: 'Parolă',
  forgotPassword: 'Ai uitat parola?',
  showPassword: 'Arată parola',
  hidePassword: 'Ascunde parola',
  submit: 'Intră în cont',
  noAccount: 'Nu ai cont?',
  registerMentee: 'Înregistrează-te ca și cursant',
  registerMentor: 'Înregistrează-te ca mentor',
  loggedOut: 'Te-ai deconectat cu succes.',
} as const

export const LOGIN_ACTIONS = [
  'login',
  'google',
  'forgot-password',
  'register-mentee',
  'register-mentor',
] as const
