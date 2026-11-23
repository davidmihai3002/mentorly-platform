export type GoalStatus = 'done' | 'in-progress' | 'planned'

export type LearningGoal = {
  readonly title: string
  readonly detail: string
  readonly status: GoalStatus
}

export type SessionEntry = {
  readonly day: string
  readonly month: string
  readonly title: string
  readonly meta: string
}

export type StudentDetails = {
  readonly fullName: string
  readonly careerGoal: string
  readonly city: string
  readonly about: string
}
