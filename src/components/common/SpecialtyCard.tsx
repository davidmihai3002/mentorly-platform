import type { Domain } from '@/types'
import { SpecialtyChip } from './SpecialtyChip'

type SpecialtyCardProps = {
  domain: Domain
}

export function SpecialtyCard({ domain }: SpecialtyCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-3">
      <SpecialtyChip domainId={domain.id} />
      <p className="text-xs leading-[1.45] text-link">{domain.description}</p>
    </div>
  )
}
