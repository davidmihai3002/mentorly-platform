const MASK_CHAR = '•'
const MAX_MASK_LENGTH = 20

/** „1 caracter”, „19 caractere”, „20 de caractere”, „101 caractere” (regula din română). */
function formatCharacterCount(count: number): string {
  if (count === 1) return '1 caracter'
  const lastTwoDigits = count % 100
  const needsDe = count >= 20 && (lastTwoDigits === 0 || lastTwoDigits >= 20)
  return `${count} ${needsDe ? 'de ' : ''}caractere`
}

/** Ascunde parola: arată doar câte caractere are, ca logurile să nu o expună niciodată. */
export function maskPassword(password: string): string {
  if (password.length === 0) return '(necompletată)'
  const dots = MASK_CHAR.repeat(Math.min(password.length, MAX_MASK_LENGTH))
  return `${dots} (${formatCharacterCount(password.length)})`
}
