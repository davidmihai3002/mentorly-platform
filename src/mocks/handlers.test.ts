import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { api, ApiError, configureAuth } from '@/lib/api/client'
import { formatRon, formatSessionSlot, formatWeeklySlot } from '@/lib/format'
import { MOCK_ACCOUNTS, MOCK_PASSWORD, resetMockDb, setCurrentUser, type MockMentor } from './db'
import { handlers } from './handlers'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({ onUnhandledFrame: 'error' })
})
beforeEach(() => {
  vi.stubEnv('VITE_API_URL', 'https://api.test')
  configureAuth({})
})
afterEach(() => {
  server.resetHandlers()
  resetMockDb()
  vi.unstubAllEnvs()
})
afterAll(() => {
  server.close()
})

const login = (email: string, password = MOCK_PASSWORD) =>
  api.post('/auth/login', { body: { email, password }, skipAuthRefresh: true })

type Page<T> = { items: T[]; page: number; pageSize: number; total: number }
const listMentors = (query: Record<string, string | number> = {}) =>
  api.get('/mentors', { query }) as Promise<Page<MockMentor>>

const apiErrorOf = (promise: Promise<unknown>) =>
  promise.then(
    () => {
      throw new Error('cererea trebuia să eșueze')
    },
    (error: unknown) => error as ApiError,
  )

describe('autentificare', () => {
  it('login corect → utilizatorul curent, vizibil apoi în /auth/me', async () => {
    const user = await login(MOCK_ACCOUNTS.mentee.email)
    expect(user).toMatchObject({ email: MOCK_ACCOUNTS.mentee.email, role: 'MENTEE' })
    await expect(api.get('/auth/me')).resolves.toEqual(user)
  })

  it('contul de mentor are rolul și starea lui', async () => {
    await expect(login(MOCK_ACCOUNTS.mentor.email)).resolves.toMatchObject({
      role: 'MENTOR',
      mentorStatus: 'APPROVED',
    })
  })

  it('parolă greșită → 401, fără sesiune', async () => {
    expect((await apiErrorOf(login(MOCK_ACCOUNTS.mentee.email, 'gresit'))).code).toBe(
      'UNAUTHORIZED',
    )
    expect((await apiErrorOf(api.get('/auth/me', { skipAuthRefresh: true }))).status).toBe(401)
  })

  it('logout închide sesiunea', async () => {
    await login(MOCK_ACCOUNTS.mentee.email)
    await expect(api.post('/auth/logout', { skipAuthRefresh: true })).resolves.toBeUndefined()
    expect((await apiErrorOf(api.get('/auth/me', { skipAuthRefresh: true }))).status).toBe(401)
  })

  it('refresh: 401 fără sesiune, 204 cu sesiune', async () => {
    expect((await apiErrorOf(api.post('/auth/refresh', { skipAuthRefresh: true }))).status).toBe(
      401,
    )
    await login(MOCK_ACCOUNTS.mentee.email)
    await expect(api.post('/auth/refresh', { skipAuthRefresh: true })).resolves.toBeUndefined()
  })
})

describe('mentori', () => {
  it('lista: doar mentori aprobați, după rating, cei fără recenzii la final', async () => {
    const { items, total } = await listMentors({ pageSize: 50 })
    expect(items.length).toBe(total)
    expect(items.every((m) => m.status === 'APPROVED')).toBe(true)

    const rated = items.filter((m) => m.rating.count > 0).map((m) => m.rating.average)
    expect(rated).toEqual([...rated].sort((a, b) => b - a))
    expect(items.at(-1)?.rating.count).toBe(0)
  })

  it('paginare', async () => {
    const first = await listMentors({ page: 1, pageSize: 2 })
    const second = await listMentors({ page: 2, pageSize: 2 })
    expect(first.items).toHaveLength(2)
    expect(first.total).toBeGreaterThan(2)
    expect(second.items[0]?.id).not.toBe(first.items[0]?.id)
  })

  it('filtre: domeniu, rating minim, preț maxim', async () => {
    const inIt = await listMentors({ domain: 'IT', pageSize: 50 })
    expect(inIt.items.length).toBeGreaterThan(0)
    expect(inIt.items.every((m) => m.domain === 'IT')).toBe(true)

    const top = await listMentors({ minRating: 4.8, pageSize: 50 })
    expect(top.items.every((m) => m.rating.average >= 4.8)).toBe(true)

    const cheap = await listMentors({ maxPriceBani: 15000, pageSize: 50 })
    // Fără preț pe ședință = mentorat sponsorizat (gratuit), deci intră sub orice preț maxim.
    expect(cheap.items.every((m) => (m.pricing.perSessionBani ?? 0) <= 15000)).toBe(true)
    expect(cheap.items.some((m) => m.sponsor !== null)).toBe(true)
  })

  it('un filtru invalid e ignorat, nu golește lista', async () => {
    const all = await listMentors({ pageSize: 50 })
    const invalid = await listMentors({ pageSize: 50, minRating: 'abc', maxPriceBani: '' })
    expect(invalid.total).toBe(all.total)
  })

  it('profil existent → detaliile; inexistent → 404', async () => {
    const { items } = await listMentors()
    const first = items[0]
    expect(first).toBeDefined()
    await expect(api.get(`/mentors/${first?.id ?? ''}`)).resolves.toMatchObject({
      id: first?.id,
    })
    expect((await apiErrorOf(api.get('/mentors/nu-exista'))).code).toBe('NOT_FOUND')
  })

  it('datele respectă formatele aplicației (bani, zile ISO, ore HH:mm)', async () => {
    const { items } = await listMentors({ pageSize: 50 })
    for (const mentor of items) {
      const { perSessionBani, monthly } = mentor.pricing
      if (perSessionBani !== null) expect(() => formatRon(perSessionBani)).not.toThrow()
      if (monthly) expect(() => formatRon(monthly.priceBani)).not.toThrow()
      for (const slot of mentor.availability) expect(() => formatWeeklySlot(slot)).not.toThrow()
    }
  })
})

describe('aplicări', () => {
  const firstMentorId = async () => (await listMentors()).items[0]?.id ?? ''

  it('cer cont', async () => {
    expect((await apiErrorOf(api.get('/applications'))).code).toBe('UNAUTHORIZED')
  })

  it('o aplicare validă apare în lista cursantului, „În așteptare”', async () => {
    await login(MOCK_ACCOUNTS.mentee.email)
    const mentorId = await firstMentorId()
    const created = await api.post('/applications', {
      body: { mentorId, answers: ['Vreau să lucrez în produs.'], questions: [] },
    })
    expect(created).toMatchObject({ mentorId, status: 'PENDING' })
    await expect(api.get('/applications')).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ mentorId, status: 'PENDING' })]),
    )
  })

  it('date invalide → 422 cu erorile pe câmpuri', async () => {
    await login(MOCK_ACCOUNTS.mentee.email)
    const error = await apiErrorOf(api.post('/applications', { body: { answers: 'nu-e-listă' } }))
    expect(error.code).toBe('VALIDATION')
    const { fieldErrors } = error.details as { fieldErrors: Record<string, string> }
    expect(Object.keys(fieldErrors).sort()).toEqual(['answers', 'mentorId'])
  })

  it('a doua aplicare în așteptare la același mentor → 409', async () => {
    await login(MOCK_ACCOUNTS.mentee.email)
    const mentorId = await firstMentorId()
    const body = { mentorId, answers: [], questions: [] }
    await api.post('/applications', { body })
    expect((await apiErrorOf(api.post('/applications', { body }))).code).toBe('CONFLICT')
  })

  it('un cont de mentor nu poate aplica → 403', async () => {
    await login(MOCK_ACCOUNTS.mentor.email)
    const mentorId = await firstMentorId()
    const error = await apiErrorOf(
      api.post('/applications', { body: { mentorId, answers: [], questions: [] } }),
    )
    expect(error.code).toBe('FORBIDDEN')
  })

  it('mentor inexistent → 404', async () => {
    await login(MOCK_ACCOUNTS.mentee.email)
    const error = await apiErrorOf(
      api.post('/applications', { body: { mentorId: 'nu-exista', answers: [], questions: [] } }),
    )
    expect(error.code).toBe('NOT_FOUND')
  })
})

describe('ședințe', () => {
  it('cer cont', async () => {
    expect((await apiErrorOf(api.get('/sessions'))).code).toBe('UNAUTHORIZED')
  })

  it('fiecare își vede doar ședințele lui', async () => {
    type Session = { menteeId: string; mentorUserId: string }
    await login(MOCK_ACCOUNTS.mentee.email)
    const mine = (await api.get('/sessions')) as Session[]
    expect(mine.every((s) => s.menteeId === MOCK_ACCOUNTS.mentee.id)).toBe(true)

    await login(MOCK_ACCOUNTS.mentor.email)
    const mentorSessions = (await api.get('/sessions')) as Session[]
    expect(mentorSessions.length).toBeGreaterThan(0)
    expect(mentorSessions.every((s) => s.mentorUserId === MOCK_ACCOUNTS.mentor.id)).toBe(true)
  })

  it('ședințele următoare: ordonate, cu link Meet și date valide', async () => {
    await login(MOCK_ACCOUNTS.mentee.email)
    const sessions = (await api.get('/sessions')) as {
      startsAt: string
      endsAt: string
      meetUrl: string
    }[]
    expect(sessions.length).toBeGreaterThan(0)
    const starts = sessions.map((s) => s.startsAt)
    expect(starts).toEqual([...starts].sort())
    for (const session of sessions) {
      expect(session.meetUrl).toMatch(/^https:\/\/meet\.google\.com\//)
      expect(() => formatSessionSlot(session.startsAt, session.endsAt)).not.toThrow()
    }
  })
})

describe('izolare între teste (resetMockDb în afterEach)', () => {
  it('pasul 1: creează o aplicare', async () => {
    await login(MOCK_ACCOUNTS.mentee.email)
    const mentorId = (await listMentors()).items[0]?.id ?? ''
    await api.post('/applications', { body: { mentorId, answers: [], questions: [] } })
    await expect(api.get('/applications')).resolves.toHaveLength(1)
  })

  it('pasul 2: testul următor pornește fără sesiune și fără aplicări', async () => {
    expect((await apiErrorOf(api.get('/auth/me', { skipAuthRefresh: true }))).status).toBe(401)
    await login(MOCK_ACCOUNTS.mentee.email)
    await expect(api.get('/applications')).resolves.toHaveLength(0)
  })

  it('sesiunea se păstrează în sessionStorage (supraviețuiește la F5) și se șterge la reset', () => {
    setCurrentUser(MOCK_ACCOUNTS.mentee.id)
    expect(sessionStorage.getItem('mentorly-mock-user')).toBe(MOCK_ACCOUNTS.mentee.id)
    resetMockDb()
    expect(sessionStorage.getItem('mentorly-mock-user')).toBeNull()
  })
})
