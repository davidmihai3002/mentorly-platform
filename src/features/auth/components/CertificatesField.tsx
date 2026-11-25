import { FileBadgeIcon } from 'lucide-react'
import { useId, type Ref } from 'react'
import { CREDENTIAL_ACCEPT } from '../constants'

type CertificatesFieldProps = {
  label: string
  count: number
  onSelect: (files: File[]) => void
  inputRef?: Ref<HTMLInputElement>
  describedById?: string
}

export function CertificatesField({
  label,
  count,
  onSelect,
  inputRef,
  describedById,
}: CertificatesFieldProps) {
  const inputId = useId()

  return (
    <label
      htmlFor={inputId}
      className="flex cursor-pointer items-center justify-between gap-2 border-t border-border pt-2.5 text-xs text-foreground has-focus-visible:ring-3 has-focus-visible:ring-ring"
    >
      <span className="flex items-center gap-2">
        <FileBadgeIcon aria-hidden="true" className="size-4" />
        {label}
        {count > 0 && <span className="font-semibold text-primary">({count})</span>}
      </span>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        multiple
        accept={CREDENTIAL_ACCEPT}
        aria-describedby={describedById}
        className="sr-only"
        onChange={(event) => {
          onSelect(Array.from(event.target.files ?? []))
          event.currentTarget.value = ''
        }}
      />
    </label>
  )
}
