import { useId } from 'react'
import type { UserRole } from '@/api'
import { useGoogleAuth } from '../hooks'
import { AuthFieldError } from './AuthFieldError'
import { GoogleAuthButton } from './GoogleAuthButton'
import { GoogleSignupDialog } from './GoogleSignupDialog'

type GoogleAuthSectionProps = {
  defaultRole: UserRole
}

export function GoogleAuthSection({ defaultRole }: GoogleAuthSectionProps) {
  const errorId = useId()
  const google = useGoogleAuth()

  return (
    <div className="space-y-1">
      <GoogleAuthButton
        onCredential={(idToken) => void google.login(idToken)}
        onError={google.fail}
      />
      <AuthFieldError id={errorId} message={google.error ?? undefined} />
      {google.pendingIdToken && (
        <GoogleSignupDialog
          idToken={google.pendingIdToken}
          defaultRole={defaultRole}
          onClose={google.closeSignup}
        />
      )}
    </div>
  )
}
