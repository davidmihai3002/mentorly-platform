/** „Formularul are 2 erori: Introdu adresa de email. Introdu parola.” — pentru cititoarele de ecran. */
export function buildErrorSummary(messages: readonly string[]): string {
  if (messages.length === 0) return ''
  const count = messages.length === 1 ? 'o eroare' : `${messages.length} erori`
  return `Formularul are ${count}: ${messages.join(' ')}`
}
