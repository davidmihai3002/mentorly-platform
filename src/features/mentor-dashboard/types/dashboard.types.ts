export type StatCard = {
  readonly label: string
  readonly value: string
  readonly detail: string
}

export type EarningsMonth = {
  readonly month: string
  readonly fullMonth: string
  readonly amount: number
}

export type UpcomingSession = {
  readonly when: string
  readonly student: string
  readonly topic: string
}

export type WeekDay = {
  readonly label: string
  readonly entries: readonly string[]
}

export type StudentRow = {
  readonly name: string
  readonly progress: string
  readonly action: string
}
