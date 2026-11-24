let accessToken: string | null = null
const sessionEndListeners = new Set<() => void>()

export function getAccessToken(): string | null {
  return accessToken
}

export function setAccessToken(token: string | null): void {
  accessToken = token
}

export function endSession(): void {
  accessToken = null
  sessionEndListeners.forEach((listener) => listener())
}

export function onSessionEnd(listener: () => void): () => void {
  sessionEndListeners.add(listener)
  return () => {
    sessionEndListeners.delete(listener)
  }
}
