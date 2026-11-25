type GoogleCredentialResponse = {
  credential: string
}

type GoogleIdConfiguration = {
  client_id: string
  callback: (response: GoogleCredentialResponse) => void
}

type GoogleButtonConfiguration = {
  theme: 'outline'
  size: 'large'
  text: 'continue_with'
  locale: string
  width: number
}

export type GoogleAccountsId = {
  initialize: (configuration: GoogleIdConfiguration) => void
  renderButton: (parent: HTMLElement, options: GoogleButtonConfiguration) => void
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: GoogleAccountsId
      }
    }
  }
}
