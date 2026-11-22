export function isLoggedOutState(state: unknown): boolean {
  return (
    typeof state === 'object' && state !== null && 'loggedOut' in state && state.loggedOut === true
  )
}
