import { maskPassword } from './maskPassword'

type AuthEventValues = Record<string, string | number | boolean | null>

export function buildAuthEventLog(values: AuthEventValues): AuthEventValues {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      /password|token|secret/i.test(key) && typeof value === 'string' ? maskPassword(value) : value,
    ]),
  )
}

export function logAuthEvent(action: string, values: AuthEventValues): void {
  if (!import.meta.env.DEV) return
  console.log(`[Mentorly] ${action}`, buildAuthEventLog(values))
}
