import { CircleCheckIcon } from 'lucide-react'
import type { Ref } from 'react'
import { MENTOR_SIGNUP_TEXT } from '../constants'

type LinkedInRequirementCardProps = {
  isConnected: boolean
  onConnect: () => void
  buttonRef?: Ref<HTMLButtonElement>
  describedById?: string
}

export function LinkedInRequirementCard({
  isConnected,
  onConnect,
  buttonRef,
  describedById,
}: LinkedInRequirementCardProps) {
  return (
    <div className="space-y-2 rounded-lg border border-primary bg-selected p-2.5">
      <p className="flex items-center gap-2 text-xs font-medium text-foreground">
        <CircleCheckIcon aria-hidden="true" className="size-4 text-primary" />
        {MENTOR_SIGNUP_TEXT.linkedinRequired}
      </p>
      <button
        ref={buttonRef}
        type="button"
        aria-describedby={describedById}
        onClick={onConnect}
        disabled={isConnected}
        className="w-full rounded-md py-1 text-xs text-foreground hover:bg-card/60 focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none disabled:font-semibold disabled:text-primary"
      >
        {isConnected ? MENTOR_SIGNUP_TEXT.linkedinConnected : MENTOR_SIGNUP_TEXT.linkedinConnect}
      </button>
    </div>
  )
}
