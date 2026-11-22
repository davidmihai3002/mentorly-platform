import { useReducer } from 'react'
import { QUIZ_STEPS } from '../constants'
import type { InterestId, QuizAnswers, QuizStep, QuizStepId } from '../types'
import { hasAnyAnswer, isStepAnswered } from '../utils'

type QuizState = {
  readonly stepIndex: number | null
  readonly answers: QuizAnswers
  readonly missingAnswerCount: number
  readonly hasStarted: boolean
}

type QuizAction =
  | { type: 'start' }
  | { type: 'select'; stepId: QuizStepId; value: string }
  | { type: 'toggleInterest'; interest: InterestId }
  | { type: 'next' }
  | { type: 'back' }

const LAST_STEP_INDEX = QUIZ_STEPS.length - 1

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'start':
      return { ...state, stepIndex: 0, missingAnswerCount: 0, hasStarted: true }
    case 'select':
      return {
        ...state,
        answers: { ...state.answers, [action.stepId]: action.value },
        missingAnswerCount: 0,
      }
    case 'toggleInterest': {
      const { interests } = state.answers
      const nextInterests = interests.includes(action.interest)
        ? interests.filter((interest) => interest !== action.interest)
        : [...interests, action.interest]
      return { ...state, answers: { ...state.answers, interests: nextInterests } }
    }
    case 'next': {
      if (state.stepIndex === null) return state
      const step = QUIZ_STEPS[state.stepIndex]
      if (!step || !isStepAnswered(state.answers, step.id))
        return { ...state, missingAnswerCount: state.missingAnswerCount + 1 }
      return { ...state, stepIndex: Math.min(state.stepIndex + 1, LAST_STEP_INDEX) }
    }
    case 'back':
      if (state.stepIndex === null) return state
      return {
        ...state,
        stepIndex: state.stepIndex === 0 ? null : state.stepIndex - 1,
        missingAnswerCount: 0,
      }
  }
}

export type UseQuizResult = {
  step: QuizStep | null
  stepIndex: number | null
  isLastStep: boolean
  answers: QuizAnswers
  missingAnswerCount: number
  hasStarted: boolean
  start: () => void
  select: (stepId: QuizStepId, value: string) => void
  toggleInterest: (interest: InterestId) => void
  next: () => void
  back: () => void
}

export function useQuiz(initialAnswers: QuizAnswers): UseQuizResult {
  const [state, dispatch] = useReducer(quizReducer, {
    stepIndex: hasAnyAnswer(initialAnswers) ? 0 : null,
    answers: initialAnswers,
    missingAnswerCount: 0,
    hasStarted: hasAnyAnswer(initialAnswers),
  })

  return {
    step: state.stepIndex === null ? null : (QUIZ_STEPS[state.stepIndex] ?? null),
    stepIndex: state.stepIndex,
    isLastStep: state.stepIndex === LAST_STEP_INDEX,
    answers: state.answers,
    missingAnswerCount: state.missingAnswerCount,
    hasStarted: state.hasStarted,
    start: () => dispatch({ type: 'start' }),
    select: (stepId, value) => dispatch({ type: 'select', stepId, value }),
    toggleInterest: (interest) => dispatch({ type: 'toggleInterest', interest }),
    next: () => dispatch({ type: 'next' }),
    back: () => dispatch({ type: 'back' }),
  }
}
