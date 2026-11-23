import { useState } from 'react'
import { PROJECTS_TEXT, SAMPLE_PROJECTS } from '../constants'
import type { ProjectFilterId } from '../types'
import { countByFilter, filterProjects } from '../utils'
import { ProjectCard } from './ProjectCard'

const FILTER_IDS: readonly ProjectFilterId[] = ['all', 'in-progress', 'submitted', 'done']

export function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectFilterId>('all')
  const projects = filterProjects(SAMPLE_PROJECTS, filter)

  return (
    <div className="flex flex-col gap-5">
      <title>{PROJECTS_TEXT.pageTitle}</title>
      <header className="flex flex-col gap-1.5">
        <h1 className="text-[clamp(1.5rem,4vw,1.8125rem)] leading-[1.2] font-bold tracking-[-0.02em] text-foreground">
          {PROJECTS_TEXT.title}
        </h1>
        <p className="text-sm text-muted-foreground">{PROJECTS_TEXT.subtitle}</p>
      </header>
      <div role="group" aria-label={PROJECTS_TEXT.filtersLabel} className="flex flex-wrap gap-2">
        {FILTER_IDS.map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={filter === id}
            onClick={() => setFilter(id)}
            className="inline-flex min-h-[26px] items-center rounded-[13px] bg-tag px-2.5 text-[11px] text-foreground transition-colors focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          >
            {PROJECTS_TEXT.filters[id]} · {countByFilter(SAMPLE_PROJECTS, id)}
          </button>
        ))}
      </div>
      {projects.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">{PROJECTS_TEXT.empty}</p>
      )}
    </div>
  )
}
