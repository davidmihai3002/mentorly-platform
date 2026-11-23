export function getFirstName(fullName: string, fallback = fullName): string {
  const [first] = fullName.trim().split(/\s+/)
  return first || fallback
}
