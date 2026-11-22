import type { QuizAnswers, QuizStepId } from '../types'

export function isStepAnswered(answers: QuizAnswers, stepId: QuizStepId): boolean {
  return Boolean(answers[stepId])
}
