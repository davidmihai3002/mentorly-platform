import type { Project, ProjectFilterId, ProjectStage } from '../types'

const PERCENT = 100

export function countStages(stages: readonly ProjectStage[]) {
  const done = stages.filter((stage) => stage.isDone).length
  return {
    done,
    total: stages.length,
    percent: stages.length ? Math.round((done / stages.length) * PERCENT) : 0,
  }
}

export function filterProjects(
  projects: readonly Project[],
  filter: ProjectFilterId,
): readonly Project[] {
  return filter === 'all' ? projects : projects.filter((project) => project.status === filter)
}

export function countByFilter(projects: readonly Project[], filter: ProjectFilterId): number {
  return filterProjects(projects, filter).length
}
