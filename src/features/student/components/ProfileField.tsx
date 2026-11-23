import { useId } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

type ProfileFieldProps = {
  label: string
  registration: UseFormRegisterReturn
  error?: string
  isMultiline?: boolean
}

const FIELD_CLASS =
  'w-full rounded-[10px] border border-border bg-card px-3 text-sm text-foreground focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none aria-invalid:border-destructive'

export function ProfileField({
  label,
  registration,
  error,
  isMultiline = false,
}: ProfileFieldProps) {
  const id = useId()
  const errorId = useId()
  const aria = {
    'aria-invalid': Boolean(error) || undefined,
    'aria-describedby': error ? errorId : undefined,
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold text-foreground">
        {label}
      </label>
      {isMultiline ? (
        <textarea
          id={id}
          rows={4}
          className={`${FIELD_CLASS} resize-y py-2`}
          {...aria}
          {...registration}
        />
      ) : (
        <input id={id} className={`${FIELD_CLASS} h-10`} {...aria} {...registration} />
      )}
      {error && (
        <p id={errorId} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
