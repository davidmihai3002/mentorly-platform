import type { HeadingLevel, Mentor } from '@/types'

type MentorNameRoleProps = {
  mentor: Pick<Mentor, 'name' | 'role'>
  nameId?: string
  headingLevel?: HeadingLevel
}

export function MentorNameRole({ mentor, nameId, headingLevel = 'h3' }: MentorNameRoleProps) {
  const Heading = headingLevel

  return (
    <div className="flex min-w-0 flex-col gap-[3px]">
      <Heading
        id={nameId}
        className="text-base leading-[1.45] font-bold tracking-[-0.02em] text-foreground"
      >
        {mentor.name}
      </Heading>
      <p className="text-xs leading-[1.45] tracking-[-0.02em] text-muted-foreground">
        {mentor.role}
      </p>
    </div>
  )
}
