import { cn } from 'cn'
import type { ReactNode } from 'react'
import { TAG_CLASS } from '@/constants'

type TagProps = {
  children: ReactNode
  className?: string
}

export function Tag({ children, className }: TagProps) {
  return <span className={cn(TAG_CLASS, className)}>{children}</span>
}
