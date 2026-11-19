type AuthFieldErrorProps = {
  id: string
  message?: string
}

export function AuthFieldError({ id, message }: AuthFieldErrorProps) {
  return (
    <p id={id} aria-live="polite" className="text-xs text-destructive empty:sr-only">
      {message && (
        <span className="block animate-in duration-(--motion-duration) ease-(--motion-ease) fade-in-0 slide-in-from-top-1">
          {message}
        </span>
      )}
    </p>
  )
}
