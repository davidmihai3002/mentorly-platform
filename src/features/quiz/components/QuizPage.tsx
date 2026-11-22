import { useNavigate, useSearchParams } from 'react-router'
import { ROUTES } from '@/constants'
import { QUIZ_TEXT } from '../constants'
import { useQuiz } from '../hooks'
import { parseQuizAnswers, toQuizSearch } from '../utils'
import { QuizIntro } from './QuizIntro'
import { QuizStepView } from './QuizStepView'

export function QuizPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const quiz = useQuiz(parseQuizAnswers(searchParams))

  function handleNext() {
    if (quiz.isLastStep && quiz.answers.pace) {
      navigate(`${ROUTES.quizResults}${toQuizSearch(quiz.answers)}`, { viewTransition: true })
      return
    }
    quiz.next()
  }

  return (
    <>
      <title>{QUIZ_TEXT.pageTitle}</title>
      {quiz.step && quiz.stepIndex !== null ? (
        <QuizStepView
          quiz={quiz}
          step={quiz.step}
          stepIndex={quiz.stepIndex}
          skipHref={`${ROUTES.quizResults}${toQuizSearch({ ...quiz.answers, pace: undefined })}`}
          onNext={handleNext}
        />
      ) : (
        <QuizIntro onStart={quiz.start} />
      )}
    </>
  )
}
