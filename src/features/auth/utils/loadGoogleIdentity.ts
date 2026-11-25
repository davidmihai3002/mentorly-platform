import { GOOGLE_SCRIPT_URL } from '../constants'
import type { GoogleAccountsId } from '../types'

let googleIdentity: Promise<GoogleAccountsId> | null = null

function injectScript(): Promise<GoogleAccountsId> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = GOOGLE_SCRIPT_URL
    script.async = true
    script.onload = () => {
      const accountsId = window.google?.accounts.id
      if (accountsId) resolve(accountsId)
      else reject(new Error('Google Identity Services is unavailable'))
    }
    script.onerror = () => {
      script.remove()
      reject(new Error('Google Identity Services failed to load'))
    }
    document.head.append(script)
  })
}

export function loadGoogleIdentity(): Promise<GoogleAccountsId> {
  googleIdentity ??= injectScript().catch((error: unknown) => {
    googleIdentity = null
    throw error
  })
  return googleIdentity
}
