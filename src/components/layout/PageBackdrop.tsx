export function PageBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-1/2 bg-backdrop-tint" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-backdrop-grid bg-[linear-gradient(to_right,var(--backdrop-grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--backdrop-grid-line)_1px,transparent_1px)] bg-size-[28px_28px]" />

      <svg
        className="absolute -top-6 right-0 h-48 w-40 text-backdrop-blob sm:w-56"
        viewBox="0 0 224 192"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M224 0H70c-6 34 6 62 38 78 40 20 58 52 66 86 4 18 22 28 50 28V0Z"
          fill="currentColor"
        />
      </svg>

      <svg
        className="absolute bottom-16 left-0 h-40 w-[55%] sm:h-52"
        viewBox="0 0 560 208"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40c70-34 150-34 214 12 58 42 82 104 150 124 70 20 142 8 196 32H0V40Z"
          className="fill-backdrop-wave-soft"
        />
        <path
          d="M0 92c64-22 120-12 166 26 46 38 72 78 132 90H0V92Z"
          className="fill-backdrop-wave"
          opacity="0.75"
        />
      </svg>
    </div>
  )
}
