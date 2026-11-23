import type { LearningGoal } from '../types'

const PERCENT = 100

export function getGoalProgress(goals: readonly LearningGoal[]) {
  const done = goals.filter((goal) => goal.status === 'done').length
  return {
    done,
    total: goals.length,
    percent: goals.length ? Math.round((done / goals.length) * PERCENT) : 0,
  }
}
