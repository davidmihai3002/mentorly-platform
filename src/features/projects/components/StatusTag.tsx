import { PROJECTS_TEXT } from '../constants'
import type { ProjectStatus } from '../types'

type StatusTagProps = {
  status: ProjectStatus
}

export function StatusTag({ status }: StatusTagProps) {
  return (
    <span className="shrink-0 rounded-[12px] bg-tag px-2.5 py-1 text-[10px] text-foreground uppercase">
      {PROJECTS_TEXT.status[status]}
    </span>
  )
}
