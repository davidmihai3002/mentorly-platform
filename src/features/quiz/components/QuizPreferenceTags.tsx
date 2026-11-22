import { QUIZ_TAG_CLASS, QUIZ_TEXT } from '../constants'

export function QuizPreferenceTags() {
  return (
    <ul className="flex flex-wrap gap-2">
      {QUIZ_TEXT.preferences.map((preference) => (
        <li key={preference} className={QUIZ_TAG_CLASS}>
          {preference}
        </li>
      ))}
    </ul>
  )
}
