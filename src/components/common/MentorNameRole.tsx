import type { Mentor } from '@/types'

type MentorNameRoleProps = {
  mentor: Pick<Mentor, 'name' | 'role'>
}

export function MentorNameRole({ mentor }: MentorNameRoleProps) {
  return (
    <div className="flex min-w-0 flex-col gap-[3px]">
      <h3 className="text-base leading-[1.45] font-bold tracking-[-0.02em] text-foreground">
        {mentor.name}
      </h3>
      <p className="text-xs leading-[1.45] tracking-[-0.02em] text-muted-foreground">
        {mentor.role}
      </p>
    </div>
  )
}
