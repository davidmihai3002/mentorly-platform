import type { DirectoryMentor } from '@/types'
import { findDomain } from '@/utils'
import { SESSION_TOPICS } from '../constants'

export function getSessionTopic(mentor: DirectoryMentor): string {
  return SESSION_TOPICS[mentor.id] ?? mentor.domainLabel ?? findDomain(mentor.domainId)?.label ?? ''
}
