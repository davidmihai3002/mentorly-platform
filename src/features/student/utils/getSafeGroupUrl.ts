const ALLOWED_PROTOCOL = 'https:'

function parseUrl(value: string): URL | undefined {
  try {
    return new URL(value)
  } catch {
    return undefined
  }
}

export function getSafeGroupUrl(value: string): string | undefined {
  const url = parseUrl(value)
  if (!url || url.protocol !== ALLOWED_PROTOCOL) return undefined
  if (url.username || url.password) return undefined
  return url.href
}
