export const CREDENTIAL_MAX_SIZE_BYTES = 10 * 1024 * 1024

export const CREDENTIAL_ACCEPT = 'application/pdf,image/jpeg,image/png,.pdf,.jpg,.jpeg,.png'

export const MENTOR_APPLICATION_TEXT = {
  pageTitle: 'Aplicare mentor – Mentorly',
  title: 'Aplicare mentor',
  linkedinLabel: 'Link profil LinkedIn',
  linkedinHelper: 'Profilul LinkedIn trebuie să fie actualizat.',
  motivationLabel: 'Motivație',
  certificates: 'Certificate',
  diplomas: 'Diplome',
  submit: 'Trimite aplicarea',
  submitted: 'Aplicarea ta este în analiză. Te anunțăm când e verificată.',
  errors: {
    linkedinRequired: 'Introdu linkul profilului LinkedIn.',
    linkedinInvalid: 'Introdu un link LinkedIn valid.',
    motivationRequired: 'Scrie motivația.',
    credentialsMissing: 'Adaugă cel puțin un certificat sau o diplomă.',
    credentialFile: 'Fișierele trebuie să fie PDF, JPG sau PNG, de cel mult 10 MB.',
    alreadySubmitted: 'Ai trimis deja aplicarea.',
    uploadFailed: 'Nu am putut încărca fișierele. Încearcă din nou.',
  },
} as const
