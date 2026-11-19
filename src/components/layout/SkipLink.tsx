import { MAIN_CONTENT_ID, SITE_TEXT } from '@/constants'

export function SkipLink() {
  return (
    <a
      href={`#${MAIN_CONTENT_ID}`}
      className="sr-only rounded-md bg-card px-4 py-2 text-sm font-medium text-foreground shadow-lg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none"
    >
      {SITE_TEXT.skipToContent}
    </a>
  )
}
