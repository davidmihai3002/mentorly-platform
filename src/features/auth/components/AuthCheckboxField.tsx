import { type ReactNode, useId } from 'react'
import { Checkbox } from '@/components/ui'

type AuthCheckboxFieldProps = {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  error?: string
  children: ReactNode
}

export function AuthCheckboxField({
  checked,
  onCheckedChange,
  error,
  children,
}: AuthCheckboxFieldProps) {
  const fieldId = useId()
  const labelId = `${fieldId}-label`
  const errorId = `${fieldId}-error`

  return (
    <div className="space-y-1">
      <div className="flex items-start gap-2.5">
        <Checkbox
          id={fieldId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          aria-labelledby={labelId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5"
        />
        <span
          id={labelId}
          onClick={() => onCheckedChange(!checked)}
          className="cursor-pointer text-xs leading-relaxed font-normal text-muted-foreground select-none"
        >
          {children}
        </span>
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
