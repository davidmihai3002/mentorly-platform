import { MENTOR_DIRECTORY } from '@/constants'
import type { QuizMatchProfile, QuizMentor } from '../types'

const DEFAULT_REASONS = [
  'Obiectiv discutat împreună',
  'Feedback pe proiecte reale',
  'Sesiuni individuale',
] as const

const QUIZ_MATCH_PROFILES: Readonly<Record<string, QuizMatchProfile>> = {
  'mihai-popescu': {
    focusLabel: 'Code review & React',
    topLabel: 'Top · Feedback apreciat',
    goals: ['first-role', 'confidence'],
    levels: ['beginner', 'advanced-beginner'],
    reasons: DEFAULT_REASONS,
  },
  'alexandru-radu': {
    focusLabel: 'Portofoliu & interviuri',
    goals: ['first-role', 'career-change'],
    levels: ['advanced-beginner', 'intermediate'],
    reasons: DEFAULT_REASONS,
  },
  'ioana-dumitru': {
    focusLabel: 'Învățare prin practică',
    goals: ['first-role', 'project'],
    levels: ['beginner', 'advanced-beginner'],
    reasons: DEFAULT_REASONS,
  },
  'vlad-georgescu': {
    focusLabel: 'Bune practici',
    goals: ['confidence', 'project'],
    levels: ['intermediate', 'advanced'],
    reasons: DEFAULT_REASONS,
  },
  'elena-ionescu': {
    focusLabel: 'Leadership aplicat',
    topLabel: 'Top · Impact în echipe',
    goals: ['confidence', 'career-change'],
    levels: ['intermediate', 'advanced'],
    reasons: DEFAULT_REASONS,
  },
  'raluca-stan': {
    focusLabel: 'Ghidare în carieră',
    topLabel: 'Top · Ghidare în carieră',
    goals: ['first-role', 'career-change'],
    levels: ['beginner', 'advanced-beginner', 'intermediate'],
    reasons: DEFAULT_REASONS,
  },
  'ana-marinescu': {
    focusLabel: 'Portofoliu UX',
    goals: ['first-role', 'career-change'],
    levels: ['beginner', 'advanced-beginner', 'intermediate'],
    reasons: DEFAULT_REASONS,
  },
  'andrei-pavel': {
    focusLabel: 'Validarea ideilor',
    goals: ['project', 'career-change'],
    levels: ['intermediate', 'advanced'],
    reasons: DEFAULT_REASONS,
  },
  'cristina-luca': {
    focusLabel: 'Marketing aplicat',
    goals: ['confidence', 'project'],
    levels: ['advanced-beginner', 'intermediate'],
    reasons: DEFAULT_REASONS,
  },
}

export const QUIZ_MENTORS: readonly QuizMentor[] = MENTOR_DIRECTORY.flatMap((mentor) => {
  const profile = QUIZ_MATCH_PROFILES[mentor.id]
  return profile ? [{ ...mentor, ...profile }] : []
})
