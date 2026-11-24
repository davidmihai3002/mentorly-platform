import { SIGNUP_TEXT } from '../constants'

export function SignupTermsText() {
  return (
    <>
      {SIGNUP_TEXT.termsPrefix}{' '}
      <a
        href="#termeni-si-conditii"
        className="font-medium text-link underline underline-offset-4 transition-colors hover:text-primary"
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
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
        }}
      >
        {SIGNUP_TEXT.privacyLink}
      </a>
      .
    </>
  )
}
