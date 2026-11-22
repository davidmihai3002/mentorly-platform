import { SIGNUP_TEXT } from '../constants'

type SignupTermsTextProps = {
  onTermsClick: () => void
  onPrivacyClick: () => void
}

export function SignupTermsText({ onTermsClick, onPrivacyClick }: SignupTermsTextProps) {
  return (
    <>
      {SIGNUP_TEXT.termsPrefix}{' '}
      <a
        href="#termeni-si-conditii"
        className="font-medium text-link underline underline-offset-4 transition-colors hover:text-primary"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onTermsClick()
        }}
      >
        {SIGNUP_TEXT.termsLink}
      </a>{' '}
      {SIGNUP_TEXT.termsMiddle}{' '}
      <a
        href="#politica-de-confidentialitate"
        className="font-medium text-link underline underline-offset-4 transition-colors hover:text-primary"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onPrivacyClick()
        }}
      >
        {SIGNUP_TEXT.privacyLink}
      </a>
      .
    </>
  )
}
