const ALLOWED_PROTOCOL = 'https:'

export function getSafeGroupUrl(value: string): string | undefined {
  if (!URL.canParse(value)) return undefined
  const url = new URL(value)
  return url.protocol === ALLOWED_PROTOCOL ? url.href : undefined
}
