import { QUIZ_STEPS, RESULTS_TEXT } from '../constants'
import type { QuizAnswers, QuizMentor, QuizStepId } from '../types'

const MAX_REASONS = 3

function findSummary(stepId: QuizStepId, value?: string): string | undefined {
  const step = QUIZ_STEPS.find((candidate) => candidate.id === stepId)
  return step?.options.find((option) => option.value === value)?.summary
}

export function buildMatchReasons(mentor: QuizMentor, answers: QuizAnswers): readonly string[] {
  const domain =
    mentor.domainId === answers.domain ? findSummary('domain', answers.domain) : undefined
  const goal =
    answers.goal && mentor.goals.includes(answers.goal)
      ? findSummary('goal', answers.goal)
      : undefined
  const level =
    answers.level && mentor.levels.includes(answers.level)
      ? findSummary('level', answers.level)
      : undefined
  const matched = [
    domain && RESULTS_TEXT.reasonDomain(domain),
    goal && RESULTS_TEXT.reasonGoal(goal),
    level && RESULTS_TEXT.reasonLevel(level),
  ].filter((reason): reason is string => Boolean(reason))
  const fallback = mentor.reasons.filter((reason) => !matched.includes(reason))
  return [...matched, ...fallback].slice(0, MAX_REASONS)
}
