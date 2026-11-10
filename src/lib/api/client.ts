import type { z } from 'zod'
import { getEnv } from '../env'
import { ApiError, codeForStatus } from './errors'

export { ApiError, type ApiErrorCode } from './errors'

export type AuthHandlers = {
  /** Tokenul curent, dacă sesiunea folosește token (strategia se decide în SCRUM-277). */
  getAccessToken?: () => string | null
  /**
   * Reîmprospătează sesiunea: true = reușit, false = sesiune invalidă. Dacă aruncă (rețea),
   * utilizatorul NU e scos din cont. Cererea de refresh trebuie să folosească `skipAuthRefresh`.
   */
  refreshSession?: () => Promise<boolean>
  /** Sesiunea nu mai poate fi reîmprospătată (de ex. logout + redirect). Apelat o singură dată. */
  onUnauthenticated?: () => void
}

type RefreshResult = 'ok' | 'invalid' | 'error'

let auth: AuthHandlers = {}
let refreshInFlight: Promise<RefreshResult> | null = null
/** Crește după fiecare refresh reușit: un 401 venit pe o sesiune mai veche doar repetă cererea. */
let sessionGeneration = 0
let unauthenticatedNotified = false

/** Conectează clientul la autentificare. O face contextul de autentificare (SCRUM-277). */
export function configureAuth(handlers: AuthHandlers): void {
  auth = handlers
  refreshInFlight = null
  unauthenticatedNotified = false
}

/** Mai multe cereri cu 401 în paralel împart aceeași reîmprospătare. */
function refreshOnce(refresh: () => Promise<boolean>): Promise<RefreshResult> {
  if (refreshInFlight) return refreshInFlight
  const attempt: Promise<RefreshResult> = refresh()
    .then((ok): RefreshResult => {
      if (ok) sessionGeneration += 1
      return ok ? 'ok' : 'invalid'
    })
    .catch((): RefreshResult => 'error')
    .finally(() => {
      // Doar dacă e tot aceeași încercare (configureAuth poate fi pornit una nouă între timp).
      if (refreshInFlight === attempt) refreshInFlight = null
    })
  refreshInFlight = attempt
  return attempt
}

function notifyUnauthenticated(): void {
  if (unauthenticatedNotified) return
  unauthenticatedNotified = true
  auth.onUnauthenticated?.()
}

const DEFAULT_TIMEOUT_MS = 15_000
const MAX_ERROR_TEXT = 500

type QueryValue = string | number | boolean | undefined

export type RequestOptions = {
  query?: Record<string, QueryValue>
  /** Obiect/listă → JSON; FormData, Blob, URLSearchParams și text se trimit ca atare. */
  body?: unknown
  signal?: AbortSignal
  timeoutMs?: number
  /** Pentru login, refresh și logout: un 401 aici e un răspuns, nu o sesiune expirată. */
  skipAuthRefresh?: boolean
}

function buildUrl(path: string, query: RequestOptions['query']): string {
  // Doar căi relative la API: cookie-urile și tokenul nu pleacă niciodată spre alt domeniu.
  if (!path.startsWith('/') || path.startsWith('//')) {
    throw new TypeError(`API: cale invalidă „${path}” (trebuie să înceapă cu un singur „/”)`)
  }
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined) params.append(key, String(value))
  }
  const search = params.size > 0 ? `?${params.toString()}` : ''
  return `${getEnv().apiUrl}${path}${search}`
}

function encodeBody(body: unknown, headers: Headers): BodyInit | undefined {
  if (body === undefined) return undefined
  const isRaw =
    body instanceof FormData ||
    body instanceof Blob ||
    body instanceof URLSearchParams ||
    typeof body === 'string'
  if (isRaw) return body // Content-Type îl pune browserul (de ex. boundary la FormData).
  headers.set('Content-Type', 'application/json')
  return JSON.stringify(body)
}

/** Timeout + anularea aplicației într-un singur semnal; merge și fără AbortSignal.any. */
function createRequestSignal(userSignal: AbortSignal | undefined, timeoutMs: number) {
  const controller = new AbortController()
  let timedOut = false
  const abortFromUser = () => controller.abort(userSignal?.reason)
  const timer = setTimeout(() => {
    timedOut = true
    controller.abort(new DOMException('Timpul cererii a expirat', 'TimeoutError'))
  }, timeoutMs)
  if (userSignal?.aborted) abortFromUser()
  else userSignal?.addEventListener('abort', abortFromUser, { once: true })

  return {
    signal: controller.signal,
    timedOut: () => timedOut,
    dispose: () => {
      clearTimeout(timer)
      userSignal?.removeEventListener('abort', abortFromUser)
    },
  }
}

async function readBody(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!text) return undefined
  const isJson = (response.headers.get('Content-Type') ?? '').includes('json')
  if (isJson) {
    try {
      return JSON.parse(text) as unknown
    } catch (error) {
      if (response.ok) throw new ApiError('INVALID_RESPONSE', response.status, undefined, error)
    }
  }
  // Un răspuns de eroare non-JSON (de ex. pagina HTML a unui proxy) rămâne pentru diagnostic.
  return response.ok ? undefined : text.slice(0, MAX_ERROR_TEXT)
}

async function send(
  method: string,
  url: string,
  options: RequestOptions,
): Promise<{ response: Response; data: unknown }> {
  const headers = new Headers({ Accept: 'application/json' })
  const token = auth.getAccessToken?.()
  if (token) headers.set('Authorization', `Bearer ${token}`)
  const body = encodeBody(options.body, headers)
  const request = createRequestSignal(options.signal, options.timeoutMs ?? DEFAULT_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
      signal: request.signal,
      credentials: 'include',
    })
    return { response, data: await readBody(response) }
  } catch (error) {
    if (error instanceof ApiError) throw error
    // Anularea cerută de aplicație (de ex. TanStack Query la schimbarea paginii) nu e eroare.
    if (options.signal?.aborted) throw error
    throw new ApiError(request.timedOut() ? 'TIMEOUT' : 'NETWORK', 0, undefined, error)
  } finally {
    request.dispose()
  }
}

async function request(
  method: string,
  path: string,
  options: RequestOptions & { schema?: z.ZodType },
  isRetry = false,
): Promise<unknown> {
  const generation = sessionGeneration
  const { response, data } = await send(method, buildUrl(path, options.query), options)

  if (response.status === 401 && !options.skipAuthRefresh && !isRetry) {
    // Sesiunea a fost deja reîmprospătată cât timp cererea era pe drum: doar o repetăm.
    if (generation !== sessionGeneration) return request(method, path, options, true)
    if (auth.refreshSession) {
      const result = await refreshOnce(auth.refreshSession)
      if (result === 'ok') return request(method, path, options, true)
      if (result === 'error') throw new ApiError('NETWORK', 0)
    }
  }

  if (!response.ok) {
    if (response.status === 401 && !options.skipAuthRefresh) notifyUnauthenticated()
    throw new ApiError(codeForStatus(response.status), response.status, data)
  }
  unauthenticatedNotified = false
  if (!options.schema) return data

  const parsed = options.schema.safeParse(data)
  if (!parsed.success) throw new ApiError('INVALID_RESPONSE', response.status, parsed.error)
  return parsed.data
}

type Validated<T> = { schema: z.ZodType<T> }

/** Cu `schema`, rezultatul e validat și tipizat; fără, e `unknown` (nu presupunem forma). */
type Method<Options> = {
  <T>(path: string, options: Options & Validated<T>): Promise<T>
  (path: string, options?: Options): Promise<unknown>
}

const withoutBody = (method: string) =>
  ((path: string, options: RequestOptions = {}) => request(method, path, options)) as Method<
    Omit<RequestOptions, 'body'>
  >

const withBody = (method: string) =>
  ((path: string, options: RequestOptions = {}) =>
    request(method, path, options)) as Method<RequestOptions>

/** Clientul HTTP al aplicației. Căile sunt relative la VITE_API_URL. */
export const api = {
  get: withoutBody('GET'),
  delete: withoutBody('DELETE'),
  post: withBody('POST'),
  put: withBody('PUT'),
  patch: withBody('PATCH'),
}
