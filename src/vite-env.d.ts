/// <reference types="vite/client" />
/// <reference types="msw/vite/client" />

// Variabilele de mediu disponibile în aplicație (vezi .env.example).
// Atenție: tot ce începe cu VITE_ ajunge în bundle-ul public — fără secrete aici.
interface ImportMetaEnv {
  /** URL-ul API-ului (mentorly-api), fără slash la final. */
  readonly VITE_API_URL: string
  /** "true" pornește mock-urile MSW în locul API-ului real (SCRUM-283). */
  readonly VITE_USE_MOCKS?: 'true' | 'false'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
