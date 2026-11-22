import type { ReactNode } from 'react'

type AuthNoticeProps = {
  children: ReactNode
}

export function AuthNotice({ children }: AuthNoticeProps) {
  return (
    <p
      role="status"
      className="rounded-lg border border-primary/30 bg-selected px-3 py-2.5 text-[13px] leading-[1.4] text-foreground"
    >
      {children}
    </p>
  )
}
