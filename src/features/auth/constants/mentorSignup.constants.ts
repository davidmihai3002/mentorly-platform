export const CV_MAX_SIZE_BYTES = 10 * 1024 * 1024

export const MENTOR_SIGNUP_TEXT = {
  pageTitle: 'Înscriere mentor – Mentorly',
  title: 'Înscriere mentor',
  subtitle: 'Ghidează noua generație.',
  documentsLabel: 'Documente pentru verificare',
  cvTitle: 'Încărcare CV (PDF)',
  dropzone: 'Drag-and-drop',
  chooseFile: 'Alege fișierul',
  errors: {
    cvType: 'CV-ul trebuie să fie un fișier PDF.',
    cvSize: 'CV-ul poate avea cel mult 10 MB.',
    cvMissing: 'Încarcă CV-ul în format PDF.',
  },
} as const
