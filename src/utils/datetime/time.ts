export const MINUTES_PER_HOUR = 60
const MINUTES_PER_DAY = 24 * MINUTES_PER_HOUR

function padTwo(value: number): string {
  return String(value).padStart(2, '0')
}

export function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return (hours ?? 0) * MINUTES_PER_HOUR + (minutes ?? 0)
}

export function formatMinutes(totalMinutes: number): string {
  const wrapped = ((totalMinutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY
  return `${padTwo(Math.floor(wrapped / MINUTES_PER_HOUR))}:${padTwo(wrapped % MINUTES_PER_HOUR)}`
}

export function addMinutes(time: string, minutes: number): string {
  return formatMinutes(toMinutes(time) + minutes)
}

export function formatTimeRange(start: string, end: string): string {
  return `${start}–${end}`
}
