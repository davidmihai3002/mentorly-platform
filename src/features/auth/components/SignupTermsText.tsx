import { Button } from '@/components/ui'
import { SIGNUP_TEXT } from '../constants'

type SignupTermsTextProps = {
  onTermsClick: () => void
  onPrivacyClick: () => void
}

export function SignupTermsText({ onTermsClick, onPrivacyClick }: SignupTermsTextProps) {
  return (
    <>
      {SIGNUP_TEXT.termsPrefix}{' '}
      <Button
        type="button"
        variant="link"
        className="h-auto p-0 text-xs font-medium text-primary underline"
        onClick={(event) => {
          event.stopPropagation()
          onTermsClick()
        }}
      >
        {SIGNUP_TEXT.termsLink}
      </Button>{' '}
      {SIGNUP_TEXT.termsMiddle}{' '}
      <Button
        type="button"
        variant="link"
        className="h-auto p-0 text-xs font-medium text-primary underline"
        onClick={(event) => {
          event.stopPropagation()
          onPrivacyClick()
        }}
      >
        {SIGNUP_TEXT.privacyLink}
      </Button>
      .
    </>
  )
}
