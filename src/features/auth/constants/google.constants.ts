export const GOOGLE_SCRIPT_URL = 'https://accounts.google.com/gsi/client'

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

export const GOOGLE_BUTTON_MAX_WIDTH = 400

export const GOOGLE_BUTTON_OPTIONS = {
  theme: 'outline',
  size: 'large',
  text: 'continue_with',
  locale: 'ro',
} as const

export const GOOGLE_SIGNUP_TEXT = {
  title: 'Finalizează înregistrarea',
  roleLegend: 'Tip cont',
  roles: [
    { value: 'MENTEE', label: 'Cursant' },
    { value: 'MENTOR', label: 'Mentor' },
  ],
  submit: 'Continuă',
} as const
