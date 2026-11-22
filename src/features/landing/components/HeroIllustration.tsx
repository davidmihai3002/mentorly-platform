type HeroIllustrationProps = {
  className?: string
}

export function HeroIllustration({ className }: HeroIllustrationProps) {
  return (
    <svg viewBox="0 0 460 400" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id="hero-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b3fc4" />
          <stop offset="0.55" stopColor="#2f7fd8" />
          <stop offset="1" stopColor="#5fc9a8" />
        </linearGradient>
        <radialGradient id="hero-core" cx="0.45" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#f4f7ff" />
          <stop offset="1" stopColor="#dfe8fb" />
        </radialGradient>
      </defs>
      <circle cx="250" cy="190" r="186" fill="none" stroke="#9fb4e6" strokeOpacity="0.6" />
      <circle cx="250" cy="190" r="150" fill="url(#hero-ring)" />
      <circle cx="250" cy="190" r="122" fill="url(#hero-core)" />
      <path
        d="M70 215 C110 120 190 70 300 64"
        fill="none"
        stroke="#1a2340"
        strokeWidth="2"
        strokeDasharray="4 6"
        strokeLinecap="round"
      />
      <rect x="20" y="262" width="102" height="42" rx="5" fill="#3e78d8" />
      <rect x="134" y="208" width="104" height="96" rx="5" fill="#2f62d0" />
      <rect x="250" y="148" width="116" height="156" rx="7" fill="#1a2340" />
      <circle cx="185" cy="152" r="12" fill="#f0c8a8" />
      <path d="M173 148 a12 12 0 0 1 24 0 z" fill="#2a3a7a" />
      <path d="M168 208 v-28 a17 17 0 0 1 34 0 v28 z" fill="#8fb3f0" />
      <circle cx="300" cy="92" r="14" fill="#f0c8a8" />
      <path d="M286 88 a14 14 0 0 1 28 0 z" fill="#1a2340" />
      <path d="M280 148 v-30 a20 20 0 0 1 40 0 v30 z" fill="#232f55" />
      <path
        d="M284 118 L232 150 L206 168"
        fill="none"
        stroke="#232f55"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M318 120 L346 150"
        fill="none"
        stroke="#232f55"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  )
}
