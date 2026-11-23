export type ProjectStatus = 'in-progress' | 'submitted' | 'done'

export type ProjectFilterId = 'all' | ProjectStatus

export type ProjectStage = {
  readonly label: string
  readonly isDone: boolean
}

export type MentorFeedback = {
  readonly title: string
  readonly text: string
  readonly nextStep?: string
}

export type Project = {
  readonly id: string
  readonly title: string
  readonly status: ProjectStatus
  readonly meta: string
  readonly description?: string
  readonly stages?: readonly ProjectStage[]
  readonly feedback?: MentorFeedback
}
