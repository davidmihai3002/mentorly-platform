import type { DirectoryMentor, DomainId } from '@/types'

export type QuizStepId = 'goal' | 'level' | 'domain' | 'pace'

export type GoalId = 'first-role' | 'confidence' | 'career-change' | 'project'

export type LevelId = 'beginner' | 'advanced-beginner' | 'intermediate' | 'advanced'

export type PaceId = 'relaxed' | 'steady' | 'intense'

export type InterestId = 'react' | 'interviews' | 'testing' | 'ux'

export type QuizAnswers = {
  readonly goal?: GoalId
  readonly level?: LevelId
  readonly domain?: DomainId
  readonly pace?: PaceId
  readonly interests: readonly InterestId[]
}

type QuizOption<Value extends string = string> = {
  readonly value: Value
  readonly title: string
  readonly description: string
  readonly summary: string
}

export type QuizStep = {
  readonly id: QuizStepId
  readonly label: string
  readonly teaser: string
  readonly title: string
  readonly subtitle: string
  readonly question: string
  readonly hint: string
  readonly options: readonly QuizOption[]
}

export type QuizMatchProfile = {
  readonly focusLabel: string
  readonly topLabel?: string
  readonly goals: readonly GoalId[]
  readonly levels: readonly LevelId[]
  readonly reasons: readonly string[]
}

export type QuizMentor = DirectoryMentor & QuizMatchProfile

export type DomainFilterId = 'all' | 'it-product' | 'management' | 'hr' | 'business'
