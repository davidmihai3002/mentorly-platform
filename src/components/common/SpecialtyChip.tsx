import type { DomainId } from '@/types'
import { findDomain } from '@/utils'
import { Tag } from './Tag'

type SpecialtyChipProps = {
  domainId: DomainId
  label?: string
}

export function SpecialtyChip({ domainId, label }: SpecialtyChipProps) {
  const domain = findDomain(domainId)
  if (!domain) return null

  return (
    <Tag>
      <span aria-hidden="true">{domain.icon}</span>
      {label ?? domain.label}
    </Tag>
  )
}
