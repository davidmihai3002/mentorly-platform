import { cn } from 'cn'
import { useId } from 'react'
import { PROJECTS_TEXT } from '../constants'
import type { Project } from '../types'
import { FeedbackNote } from './FeedbackNote'
import { ProjectProgress } from './ProjectProgress'
import { StatusTag } from './StatusTag'
import { SubmitVersionForm } from './SubmitVersionForm'

type ProjectCardProps = {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const titleId = useId()
  const isActive = project.status === 'in-progress'

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        'flex flex-col gap-3 rounded-[16px] border border-border bg-card p-5',
        isActive && 'gap-4 sm:p-6',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h2
          id={titleId}
          className={cn('font-bold text-foreground', isActive ? 'text-xl' : 'text-base')}
        >
          {project.title}
        </h2>
        <StatusTag status={project.status} />
      </div>
      <p className="text-xs text-muted-foreground">{project.meta}</p>
      {project.description && <p className="text-sm text-foreground">{project.description}</p>}
      {project.stages && <ProjectProgress stages={project.stages} />}
      {isActive && <SubmitVersionForm />}
      {isActive && project.feedback && <FeedbackNote feedback={project.feedback} />}
      {!isActive && project.feedback && (
        <details className="group">
          <summary className="w-fit cursor-pointer rounded-sm text-xs font-medium text-link marker:content-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none">
            {PROJECTS_TEXT.viewFeedback}{' '}
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-open:rotate-90"
            >
              →
            </span>
          </summary>
          <div className="mt-3">
            <FeedbackNote feedback={project.feedback} />
          </div>
        </details>
      )}
    </article>
  )
}
