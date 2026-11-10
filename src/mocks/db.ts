import type { WeeklySlot } from '@/lib/format'

/**
 * Date simulate pentru dezvoltare, staging fără backend și teste. Formatele urmează
 * convențiile aplicației: sume în bani (întregi), date ISO cu `Z`, zile ISO 1–7.
 */

/** Parola conturilor de test din mock (doar local / staging fără backend, nu e un secret). */
export const MOCK_PASSWORD = 'parola-mock-123'

export type MockUser = {
  id: string
  email: string
  name: string
  role: 'MENTEE' | 'MENTOR'
  mentorStatus?: 'PENDING' | 'APPROVED' | 'REJECTED'
}

export const MOCK_ACCOUNTS = {
  mentee: { id: 'u-mentee', email: 'cursant@mentorly.test', name: 'Ioana Pop', role: 'MENTEE' },
  mentor: {
    id: 'u-mentor',
    email: 'mentor@mentorly.test',
    name: 'Andrei Ionescu',
    role: 'MENTOR',
    mentorStatus: 'APPROVED',
  },
} as const satisfies Record<string, MockUser>

export type MockMentor = {
  id: string
  name: string
  photoUrl: string | null
  domain: string
  headline: string
  bio: string
  status: 'PENDING' | 'APPROVED'
  pricing: {
    perSessionBani: number | null
    monthly: { priceBani: number; sessionsPerMonth: number; discountPercent: number } | null
  }
  rating: { average: number; count: number }
  hasTest: boolean
  capacity: number
  sponsor: { name: string } | null
  availability: WeeklySlot[]
}

type MentorSeed = Pick<MockMentor, 'id' | 'name' | 'domain' | 'headline'> & Partial<MockMentor>

const mentor = (seed: MentorSeed): MockMentor => ({
  photoUrl: null,
  bio: `${seed.headline}. Te ajut să-ți clarifici pașii următori în carieră.`,
  status: 'APPROVED',
  pricing: { perSessionBani: 15000, monthly: null },
  rating: { average: 4.5, count: 10 },
  hasTest: false,
  capacity: 5,
  sponsor: null,
  availability: [{ dayOfWeek: 1, startTime: '18:00', endTime: '20:00' }],
  ...seed,
})

const MENTORS: MockMentor[] = [
  mentor({
    id: 'm-ana',
    name: 'Ana Marin',
    domain: 'Product Management',
    headline: 'Senior Product Manager',
    pricing: {
      perSessionBani: 20000,
      monthly: { priceBani: 68000, sessionsPerMonth: 4, discountPercent: 15 },
    },
    rating: { average: 4.9, count: 32 },
    hasTest: true,
  }),
  mentor({
    id: 'm-radu',
    name: 'Radu Stoica',
    domain: 'IT',
    headline: 'Software Engineer',
    pricing: { perSessionBani: 12000, monthly: null },
    rating: { average: 4.7, count: 18 },
    availability: [
      { dayOfWeek: 2, startTime: '19:00', endTime: '21:00' },
      { dayOfWeek: 4, startTime: '19:00', endTime: '21:00' },
    ],
  }),
  mentor({
    id: 'm-elena',
    name: 'Elena Dobre',
    domain: 'IT',
    headline: 'Data Scientist',
    pricing: { perSessionBani: null, monthly: null },
    rating: { average: 4.8, count: 9 },
    sponsor: { name: 'Companie Parteneră' },
  }),
  mentor({
    id: 'm-mihai',
    name: 'Mihai Georgescu',
    domain: 'Marketing',
    headline: 'Growth Marketer',
    pricing: { perSessionBani: 15050, monthly: null },
    rating: { average: 4.2, count: 6 },
    capacity: 0,
  }),
  mentor({
    id: 'm-irina',
    name: 'Irina Vasile',
    domain: 'Design',
    headline: 'UX Designer',
    rating: { average: 0, count: 0 },
  }),
  mentor({
    id: 'm-pending',
    name: 'Cont în verificare',
    domain: 'IT',
    headline: 'Mentor neaprobat încă',
    status: 'PENDING',
  }),
]

export type MockApplication = {
  id: string
  mentorId: string
  menteeId: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
  answers: string[]
  questions: string[]
  createdAt: string
}

export type MockSession = {
  id: string
  /** Utilizatorii care văd ședința: cursantul și contul mentorului. */
  menteeId: string
  mentorUserId: string
  mentorId: string
  mentorName: string
  type: 'FREE_CALL' | 'PAID'
  startsAt: string
  endsAt: string
  meetUrl: string
}

const HOUR_MS = 60 * 60 * 1000

/** O ședință peste `daysAhead` zile, la ora fixă (fără minute), de o oră. */
function sessionIn(
  id: string,
  daysAhead: number,
  mentor: { id: string; name: string; userId: string },
): MockSession {
  const start = new Date(Date.now() + daysAhead * 24 * HOUR_MS)
  start.setUTCMinutes(0, 0, 0)
  return {
    id,
    menteeId: MOCK_ACCOUNTS.mentee.id,
    mentorUserId: mentor.userId,
    mentorId: mentor.id,
    mentorName: mentor.name,
    type: 'PAID',
    startsAt: start.toISOString(),
    endsAt: new Date(start.getTime() + HOUR_MS).toISOString(),
    meetUrl: `https://meet.google.com/mock-${id}`,
  }
}

// Sesiunea mock supraviețuiește la reîncărcarea paginii (F5) în browser.
const SESSION_KEY = 'mentorly-mock-user'
const storage = () => (typeof sessionStorage === 'undefined' ? null : sessionStorage)

function createDb() {
  return {
    users: Object.values(MOCK_ACCOUNTS) as MockUser[],
    mentors: MENTORS.map((m) => structuredClone(m)),
    applications: [] as MockApplication[],
    sessions: [
      sessionIn('s-2', 5, { id: 'm-radu', name: 'Radu Stoica', userId: 'u-radu' }),
      sessionIn('s-1', 2, { id: 'm-ana', name: 'Ana Marin', userId: 'u-ana' }),
      sessionIn('s-3', 3, {
        id: 'm-andrei',
        name: 'Andrei Ionescu',
        userId: MOCK_ACCOUNTS.mentor.id,
      }),
    ],
    currentUserId: storage()?.getItem(SESSION_KEY) ?? null,
    nextId: 1,
  }
}

let db = createDb()

/** Starea curentă a mock-ului (sesiune, aplicări). */
export const mockDb = () => db

/** Utilizatorul logat în mock (null = delogat), păstrat și peste reîncărcarea paginii. */
export function setCurrentUser(userId: string | null): void {
  db.currentUserId = userId
  if (userId) storage()?.setItem(SESSION_KEY, userId)
  else storage()?.removeItem(SESSION_KEY)
}

/** ID simplu și unic (crypto.randomUUID lipsește pe http fără TLS). */
export const nextMockId = (prefix: string) => `${prefix}-${db.nextId++}`

/** Revine la datele inițiale, fără sesiune. În teste: după fiecare test (afterEach). */
export function resetMockDb(): void {
  storage()?.removeItem(SESSION_KEY)
  db = createDb()
}
