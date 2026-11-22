import type { DomainId } from '@/types'
import { INTERESTS, QUIZ_PARAM_KEYS, QUIZ_STEPS } from '../constants'
import type { GoalId, InterestId, LevelId, PaceId, QuizAnswers, QuizStepId } from '../types'

const INTEREST_SEPARATOR = ','

function readOption<Value extends string>(params: URLSearchParams, stepId: QuizStepId) {
  const raw = params.get(QUIZ_PARAM_KEYS[stepId])
  const step = QUIZ_STEPS.find((candidate) => candidate.id === stepId)
  const isValid = step?.options.some((option) => option.value === raw)
  return isValid ? (raw as Value) : undefined
}

function readInterests(params: URLSearchParams): readonly InterestId[] {
  const raw = params.get(QUIZ_PARAM_KEYS.interests)?.split(INTEREST_SEPARATOR) ?? []
  return INTERESTS.filter((interest) => raw.includes(interest.id)).map((interest) => interest.id)
}

export function parseQuizAnswers(params: URLSearchParams): QuizAnswers {
  return {
    goal: readOption<GoalId>(params, 'goal'),
    level: readOption<LevelId>(params, 'level'),
    domain: readOption<DomainId>(params, 'domain'),
    pace: readOption<PaceId>(params, 'pace'),
    interests: readInterests(params),
  }
}

export function toQuizSearch(answers: QuizAnswers): string {
  const values: Record<string, string | undefined> = {
    [QUIZ_PARAM_KEYS.goal]: answers.goal,
    [QUIZ_PARAM_KEYS.level]: answers.level,
    [QUIZ_PARAM_KEYS.domain]: answers.domain,
    [QUIZ_PARAM_KEYS.pace]: answers.pace,
    [QUIZ_PARAM_KEYS.interests]: answers.interests.join(INTEREST_SEPARATOR) || undefined,
  }
  const entries = Object.entries(values).flatMap(([key, value]) => (value ? [[key, value]] : []))
  const search = new URLSearchParams(entries).toString()
  return search ? `?${search}` : ''
}

export function hasAnyAnswer(answers: QuizAnswers): boolean {
  return Boolean(answers.goal ?? answers.level ?? answers.domain ?? answers.pace)
}
