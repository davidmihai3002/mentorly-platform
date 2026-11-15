import { type ReactNode, type Ref, useId } from 'react'
import { Checkbox } from '@/components/ui'

type AuthCheckboxFieldProps = {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  onBlur?: () => void
  inputRef?: Ref<HTMLInputElement>
  required?: boolean
  error?: string
  children: ReactNode
}

export function AuthCheckboxField({
  checked,
  onCheckedChange,
  onBlur,
  inputRef,
  required = true,
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
          onBlur={onBlur}
          inputRef={inputRef}
          required={required}
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
        <p id={errorId} aria-live="polite" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
