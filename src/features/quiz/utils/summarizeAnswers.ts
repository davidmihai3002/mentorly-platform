import { QUIZ_STEPS } from '../constants'
import type { QuizAnswers } from '../types'

export function summarizeAnswers(answers: QuizAnswers): readonly string[] {
  return QUIZ_STEPS.flatMap((step) => {
    const option = step.options.find((candidate) => candidate.value === answers[step.id])
    return option ? [option.summary] : []
  })
}
