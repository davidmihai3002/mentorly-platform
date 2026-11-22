import { FileBadgeIcon } from 'lucide-react'
import { useId } from 'react'
import { MENTOR_SIGNUP_TEXT } from '../constants'

type CertificatesFieldProps = {
  count: number
  onSelect: (files: File[]) => void
}

export function CertificatesField({ count, onSelect }: CertificatesFieldProps) {
  const inputId = useId()

  return (
    <label
      htmlFor={inputId}
      className="flex cursor-pointer items-center justify-between gap-2 border-t border-border pt-2.5 text-xs text-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring"
    >
      <span className="flex items-center gap-2">
        <FileBadgeIcon aria-hidden="true" className="size-4" />
        {MENTOR_SIGNUP_TEXT.certificates}
        {count > 0 && <span className="font-semibold text-primary">({count})</span>}
      </span>
      <span className="text-muted-foreground">{MENTOR_SIGNUP_TEXT.optional}</span>
      <input
        id={inputId}
        type="file"
        multiple
        accept="application/pdf,image/*"
        className="sr-only"
        onChange={(event) => {
          onSelect(Array.from(event.target.files ?? []))
          event.currentTarget.value = ''
        }}
      />
    </label>
  )
}
