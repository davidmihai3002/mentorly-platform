import { delay, http, HttpResponse } from 'msw'
import {
  mockDb,
  MOCK_PASSWORD,
  nextMockId,
  setCurrentUser,
  type MockApplication,
  type MockMentor,
} from './db'

/**
 * Mock-ul API-ului mentorly-api. Adresele (`/auth/*`, `/mentors`, `/applications`,
 * `/sessions`) și formele răspunsurilor sunt PROVIZORII, de confirmat cu backend-ul; când
 * apare contractul OpenAPI, se aliniază aici. `*` potrivește orice origine (orice
 * VITE_API_URL); de aceea testele pornesc serverul cu `onUnhandledFrame: 'error'`.
 * În teste, starea se resetează după fiecare test cu `resetMockDb()`.
 */

const DEFAULT_PAGE_SIZE = 12
const MAX_PAGE_SIZE = 50
const MAX_ANSWERS = 3

// Întârziere realistă în browser; zero în teste, ca suita să rămână rapidă.
const latency = () => delay(import.meta.env.MODE === 'test' ? 0 : 'real')

function errorResponse(status: number, message: string, extra: object = {}) {
  return HttpResponse.json({ statusCode: status, message, ...extra }, { status })
}

const currentUser = () => mockDb().users.find((u) => u.id === mockDb().currentUserId)

async function readJson(request: Request): Promise<Record<string, unknown>> {
  const body: unknown = await request.json().catch(() => null)
  return typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : {}
}

const authHandlers = [
  http.post('*/auth/login', async ({ request }) => {
    await latency()
    const { email, password } = await readJson(request)
    const user = mockDb().users.find((u) => u.email === email)
    if (!user || password !== MOCK_PASSWORD) {
      return errorResponse(401, 'Email sau parolă greșite')
    }
    setCurrentUser(user.id)
    return HttpResponse.json(user)
  }),

  http.get('*/auth/me', async () => {
    await latency()
    const user = currentUser()
    return user ? HttpResponse.json(user) : errorResponse(401, 'Neautentificat')
  }),

  http.post('*/auth/refresh', async () => {
    await latency()
    return currentUser()
      ? new HttpResponse(null, { status: 204 })
      : errorResponse(401, 'Sesiune expirată')
  }),

  http.post('*/auth/logout', async () => {
    await latency()
    setCurrentUser(null)
    return new HttpResponse(null, { status: 204 })
  }),
]

/** Mentorii cu recenzii, după rating; mentorii noi (fără recenzii) la final. */
function byRating(a: MockMentor, b: MockMentor): number {
  if ((a.rating.count === 0) !== (b.rating.count === 0)) return a.rating.count === 0 ? 1 : -1
  return b.rating.average - a.rating.average
}

/** Un număr finit din query, sau valoarea implicită (un filtru invalid nu golește lista). */
function finiteOr(value: string | null, fallback: number): number {
  const parsed = value === null || value === '' ? NaN : Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function positiveInt(value: string | null, fallback: number, max = Infinity): number {
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, max) : fallback
}

const mentorHandlers = [
  http.get('*/mentors', async ({ request }) => {
    await latency()
    const params = new URL(request.url).searchParams
    const domain = params.get('domain')
    const minRating = finiteOr(params.get('minRating'), 0)
    const maxPrice = finiteOr(params.get('maxPriceBani'), Infinity)
    const page = positiveInt(params.get('page'), 1)
    const pageSize = positiveInt(params.get('pageSize'), DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE)

    const matches = mockDb()
      .mentors.filter((m) => m.status === 'APPROVED')
      .filter((m) => !domain || m.domain === domain)
      .filter((m) => m.rating.average >= minRating)
      .filter((m) => (m.pricing.perSessionBani ?? 0) <= maxPrice)
      .sort(byRating)

    const items = matches.slice((page - 1) * pageSize, page * pageSize)
    return HttpResponse.json({ items, page, pageSize, total: matches.length })
  }),

  http.get('*/mentors/:id', async ({ params }) => {
    await latency()
    const found = mockDb().mentors.find((m) => m.id === params.id && m.status === 'APPROVED')
    return found ? HttpResponse.json(found) : errorResponse(404, 'Mentorul nu există')
  }),
]

function validateApplication(body: Record<string, unknown>): Record<string, string> {
  const isTextList = (value: unknown) =>
    Array.isArray(value) && value.length <= MAX_ANSWERS && value.every((v) => typeof v === 'string')
  const errors: Record<string, string> = {}
  if (typeof body.mentorId !== 'string' || body.mentorId === '') errors.mentorId = 'Obligatoriu'
  if (!isTextList(body.answers)) errors.answers = `Cel mult ${MAX_ANSWERS} răspunsuri`
  if (body.questions !== undefined && !isTextList(body.questions)) {
    errors.questions = `Cel mult ${MAX_ANSWERS} întrebări`
  }
  return errors
}

const applicationHandlers = [
  http.get('*/applications', async () => {
    await latency()
    const user = currentUser()
    if (!user) return errorResponse(401, 'Neautentificat')
    return HttpResponse.json(mockDb().applications.filter((a) => a.menteeId === user.id))
  }),

  http.post('*/applications', async ({ request }) => {
    await latency()
    const user = currentUser()
    if (!user) return errorResponse(401, 'Neautentificat')
    if (user.role !== 'MENTEE') return errorResponse(403, 'Doar cursanții pot aplica')

    const body = await readJson(request)
    const fieldErrors = validateApplication(body)
    if (Object.keys(fieldErrors).length > 0) {
      return errorResponse(422, 'Date invalide', { fieldErrors })
    }
    const mentorId = String(body.mentorId)
    if (!mockDb().mentors.some((m) => m.id === mentorId && m.status === 'APPROVED')) {
      return errorResponse(404, 'Mentorul nu există')
    }
    const pending = mockDb().applications.some(
      (a) => a.menteeId === user.id && a.mentorId === mentorId && a.status === 'PENDING',
    )
    if (pending) return errorResponse(409, 'Ai deja o aplicare în așteptare la acest mentor')

    const application: MockApplication = {
      id: nextMockId('a'),
      mentorId,
      menteeId: user.id,
      status: 'PENDING',
      answers: body.answers as string[],
      questions: (body.questions as string[] | undefined) ?? [],
      createdAt: new Date().toISOString(),
    }
    mockDb().applications.push(application)
    return HttpResponse.json(application, { status: 201 })
  }),
]

const sessionHandlers = [
  http.get('*/sessions', async () => {
    await latency()
    const user = currentUser()
    if (!user) return errorResponse(401, 'Neautentificat')
    const now = new Date().toISOString()
    const upcoming = mockDb()
      .sessions.filter((s) => s.menteeId === user.id || s.mentorUserId === user.id)
      .filter((s) => s.endsAt > now)
      .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    return HttpResponse.json(upcoming)
  }),
]

export const handlers = [
  ...authHandlers,
  ...mentorHandlers,
  ...applicationHandlers,
  ...sessionHandlers,
]
