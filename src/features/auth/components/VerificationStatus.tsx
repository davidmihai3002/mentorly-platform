import { MENTOR_SIGNUP_TEXT } from '../constants'

export function VerificationStatus() {
  return (
    <p className="rounded-md border border-status-border bg-status px-2 py-1 text-[11px] text-foreground">
      {MENTOR_SIGNUP_TEXT.status}
    </p>
  )
}
