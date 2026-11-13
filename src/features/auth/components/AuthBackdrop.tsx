export function AuthBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 -right-24 h-112 w-112 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-112 w-112 rounded-full bg-primary/10 blur-3xl" />

      <svg
        className="absolute top-0 right-0 h-88 w-88 text-primary/15"
        viewBox="0 0 400 400"
        fill="none"
      >
        <defs>
          <pattern id="auth-grid-tr" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect x="120" y="0" width="280" height="280" fill="url(#auth-grid-tr)" />
        <path
          d="M40 0C120 90 220 60 320 150C360 186 385 240 400 300"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M80 0C150 75 240 50 335 135C370 168 390 215 400 265"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <svg
        className="absolute bottom-0 left-0 h-72 w-88 text-primary/15"
        viewBox="0 0 400 320"
        fill="none"
      >
        <defs>
          <pattern id="auth-grid-bl" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect x="0" y="80" width="260" height="240" fill="url(#auth-grid-bl)" />
        <path
          d="M0 150C70 140 130 180 200 230C260 272 320 295 400 310"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}
