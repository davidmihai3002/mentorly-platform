export const CV_MAX_SIZE_BYTES = 5 * 1024 * 1024

export const MENTOR_SIGNUP_TEXT = {
  pageTitle: 'Înscriere mentor – Mentorly',
  title: 'Înscriere mentor',
  subtitle: 'Ghidează noua generație.',
  emailLabel: 'Email',
  emailPlaceholder: 'email@mentor.ro',
  passwordLabel: 'Parolă',
  submit: 'Intră în cont',
  linkedin: 'Sau conectează-te cu LinkedIn',
  documentsTab: 'Documente',
  documentsLabel: 'Documente pentru verificare',
  linkedinRequired: 'Profil LinkedIn obligatoriu',
  linkedinConnect: 'Conectează profilul',
  linkedinConnected: 'Profil conectat',
  cvTitle: 'Încărcare CV (PDF)',
  dropzone: 'Drag-and-drop',
  chooseFile: 'Alege fișierul',
  certificates: 'Certificate & Diplome',
  optional: '(opțional)',
  status: 'Status: În curs de verificare (Manual Admin)',
  errors: {
    cvType: 'CV-ul trebuie să fie un fișier PDF.',
    cvSize: 'CV-ul poate avea cel mult 5 MB.',
    cvMissing: 'Încarcă CV-ul în format PDF.',
    linkedinMissing: 'Conectează profilul LinkedIn.',
  },
} as const
