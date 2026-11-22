import { RESULTS_TEXT } from '../constants'
import type { QuizAnswers, QuizMentor } from '../types'
import { buildMatchReasons } from './buildMatchReasons'

const RECOMMENDATION_COUNT = 3

const SCORE_WEIGHTS = {
  domain: 4,
  goal: 2,
  level: 1,
} as const

function scoreMentor(mentor: QuizMentor, answers: QuizAnswers): number {
  const domainScore = mentor.domainId === answers.domain ? SCORE_WEIGHTS.domain : 0
  const goalScore = answers.goal && mentor.goals.includes(answers.goal) ? SCORE_WEIGHTS.goal : 0
  const levelScore =
    answers.level && mentor.levels.includes(answers.level) ? SCORE_WEIGHTS.level : 0
  return domainScore + goalScore + levelScore
}

export function recommendMentors(
  answers: QuizAnswers,
  mentors: readonly QuizMentor[],
): readonly QuizMentor[] {
  return mentors
    .map((mentor) => ({ mentor, score: scoreMentor(mentor, answers) }))
    .toSorted((a, b) => b.score - a.score)
    .slice(0, RECOMMENDATION_COUNT)
    .map(({ mentor }, index) => ({
      ...mentor,
      highlight: index === 0 ? RESULTS_TEXT.firstRecommendation : mentor.focusLabel,
      reasons: buildMatchReasons(mentor, answers),
    }))
}
