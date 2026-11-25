type VerificationStatusProps = {
  text: string
}

export function VerificationStatus({ text }: VerificationStatusProps) {
  return (
    <p
      role="status"
      className="rounded-md border border-status-border bg-status px-2 py-1 text-[11px] text-foreground"
    >
      {text}
    </p>
  )
}
