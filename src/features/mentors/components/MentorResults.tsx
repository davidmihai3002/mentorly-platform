import { cn } from 'cn'
import { useState } from 'react'
import { MentorCard, MentorPreviewDialog } from '@/components'
import type { DirectoryMentor, Mentor } from '@/types'
import { getMentorProfilePath } from '@/utils'
import { SEARCH_TEXT } from '../constants'
import type { ViewId } from '../types'
import { toSearchCard } from '../utils'

type MentorResultsProps = {
  mentors: readonly DirectoryMentor[]
  view: ViewId
}

export function MentorResults({ mentors, view }: MentorResultsProps) {
  const [previewMentor, setPreviewMentor] = useState<Mentor | null>(null)
  if (mentors.length === 0) {
    return (
      <p className="rounded-[14px] bg-card p-6 text-sm text-muted-foreground">
        {SEARCH_TEXT.empty}
      </p>
    )
  }

  return (
    <>
      <MentorPreviewDialog mentor={previewMentor} onClose={() => setPreviewMentor(null)} />
      <ul className={cn('grid gap-4', view === 'grid' && 'sm:grid-cols-2')}>
        {mentors.map((mentor) => (
          <li key={mentor.id} className="flex flex-col">
            <MentorCard
              onApply={() => setPreviewMentor(mentor)}
              mentor={toSearchCard(mentor, view)}
              variant={view}
              headingLevel="h2"
              profileHref={getMentorProfilePath(mentor.id)}
              className="flex-1"
            />
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground">
        {SEARCH_TEXT.showing(mentors.length, mentors.length)}
      </p>
    </>
  )
}
