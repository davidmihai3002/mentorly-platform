import { useEffect, useEffectEvent, useRef } from 'react'
import { GOOGLE_BUTTON_MAX_WIDTH, GOOGLE_BUTTON_OPTIONS, GOOGLE_CLIENT_ID } from '../constants'
import { loadGoogleIdentity } from '../utils'

type GoogleAuthButtonProps = {
  onCredential: (idToken: string) => void
  onError: () => void
}

export function GoogleAuthButton({ onCredential, onError }: GoogleAuthButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const handleCredential = useEffectEvent((idToken: string) => onCredential(idToken))
  const handleError = useEffectEvent(() => onError())

  useEffect(() => {
    let isActive = true
    loadGoogleIdentity().then(
      (accountsId) => {
        const container = containerRef.current
        if (!isActive || !container) return
        accountsId.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: ({ credential }) => handleCredential(credential),
        })
        accountsId.renderButton(container, {
          ...GOOGLE_BUTTON_OPTIONS,
          width: Math.min(container.clientWidth, GOOGLE_BUTTON_MAX_WIDTH),
        })
      },
      () => {
        if (isActive) handleError()
      },
    )
    return () => {
      isActive = false
    }
  }, [])

  return <div ref={containerRef} className="flex min-h-10 w-full justify-center" />
}
