import { API_URL } from '@/constants'
import { endSession, getAccessToken, setAccessToken } from './accessToken'
import { ApiError } from './ApiError'
import type { AuthResponse } from './auth.types'

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
}

const AUTH_PREFIX = '/auth/'
const LOGOUT_PATH = '/auth/logout'
const REFRESH_PATH = '/auth/refresh'

let refreshPromise: Promise<AuthResponse> | null = null

function send(path: string, { method = 'GET', body }: RequestOptions): Promise<Response> {
  const headers = new Headers()
  const token = getAccessToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)
  if (body !== undefined) headers.set('Content-Type', 'application/json')

  return fetch(`${API_URL}${path}`, {
    method,
    headers,
    credentials: 'include',
    body: body === undefined ? undefined : JSON.stringify(body),
  })
}

async function readMessages(response: Response): Promise<string[]> {
  const data: unknown = await response.json().catch(() => null)
  if (typeof data !== 'object' || data === null || !('message' in data)) return []
  const { message } = data
  if (typeof message === 'string') return [message]
  return Array.isArray(message) ? message.filter((item) => typeof item === 'string') : []
}

async function parse<T>(response: Response): Promise<T> {
  if (!response.ok) throw new ApiError(response.status, await readMessages(response))
  if (response.status === 204) return undefined as T
  return (await response.json()) as T
}

function canRefresh(path: string): boolean {
  return !path.startsWith(AUTH_PREFIX) || path === LOGOUT_PATH
}

export function refreshSession(): Promise<AuthResponse> {
  refreshPromise ??= send(REFRESH_PATH, { method: 'POST' })
    .then((response) => parse<AuthResponse>(response))
    .then((auth) => {
      setAccessToken(auth.accessToken)
      return auth
    })
    .finally(() => {
      refreshPromise = null
    })
  return refreshPromise
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const response = await send(path, options)
  if (response.status !== 401 || !canRefresh(path)) return parse<T>(response)

  try {
    await refreshSession()
  } catch (error) {
    endSession()
    throw error
  }
  return parse<T>(await send(path, options))
}
