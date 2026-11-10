// Validare fără Zod, ca verificarea de la pornire să nu mărească fișierul JS principal.

export type AppEnv = {
  /** URL-ul API-ului, fără slash final. */
  apiUrl: string
  /** Mock-urile MSW în locul API-ului real (SCRUM-283). */
  useMocks: boolean
}

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1'])

function parseApiUrl(value: unknown, isProduction: boolean): string | string[] {
  if (typeof value !== 'string' || !URL.canParse(value)) {
    return ['VITE_API_URL: trebuie să fie un URL http(s)']
  }
  const url = new URL(value)
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return ['VITE_API_URL: trebuie să fie un URL http(s)']
  }
  // În producție, cookie-urile și tokenul nu circulă necriptat.
  if (isProduction && url.protocol === 'http:' && !LOCAL_HOSTS.has(url.hostname)) {
    return ['VITE_API_URL: în producție trebuie să fie https']
  }
  return value.replace(/\/+$/, '')
}

function parseUseMocks(value: unknown): boolean | string[] {
  if (value === undefined || value === '' || value === 'false') return false
  if (value === 'true') return true
  return ['VITE_USE_MOCKS: trebuie să fie „true” sau „false”']
}

let cache: { key: string; env: AppEnv } | undefined

/**
 * Variabilele de mediu validate. Se apelează la pornire (main.tsx), ca o configurare
 * greșită să oprească aplicația imediat, nu în mijlocul unei sesiuni.
 */
export function getEnv(): AppEnv {
  const raw = import.meta.env
  const key = `${String(raw.VITE_API_URL)}|${String(raw.VITE_USE_MOCKS)}|${String(raw.PROD)}`
  if (cache?.key === key) return cache.env

  const apiUrl = parseApiUrl(raw.VITE_API_URL, raw.PROD)
  const useMocks = parseUseMocks(raw.VITE_USE_MOCKS)
  const errors = [apiUrl, useMocks].filter((result) => Array.isArray(result)).flat()
  if (errors.length > 0 || typeof apiUrl !== 'string' || typeof useMocks !== 'boolean') {
    throw new Error(`Configurare invalidă (.env, vezi .env.example):\n${errors.join('\n')}`)
  }

  cache = { key, env: { apiUrl, useMocks } }
  return cache.env
}
