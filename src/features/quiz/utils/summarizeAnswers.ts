import { INTERESTS, QUIZ_STEPS } from '../constants'
import type { QuizAnswers } from '../types'

export function summarizeAnswers(answers: QuizAnswers): readonly string[] {
  const stepSummaries = QUIZ_STEPS.flatMap((step) => {
    const option = step.options.find((candidate) => candidate.value === answers[step.id])
    return option ? [option.summary] : []
  })
  const interestLabels = INTERESTS.filter((interest) =>
    answers.interests.includes(interest.id),
  ).map((interest) => interest.label)
  return [...stepSummaries, ...interestLabels]
}
